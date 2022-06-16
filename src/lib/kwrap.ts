// .kwrap file parser

const fileToBytes = (file: File): Promise<ArrayBuffer> => {
    return new Promise((ok) => {
        let reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = (e) => {
            let bytes = e.target?.result as ArrayBuffer
            ok(bytes)
        }
    })
}

class Bytes {
    bytes = new Uint8Array()
    offset = 0

    constructor(bytes: ArrayBuffer) {
        this.bytes = new Uint8Array(bytes)
    }

    // Read the byte of specified length
    public readBytes(len: number): Uint8Array | null {
        if (this.bytes.length - this.offset >= len) {
            let rst = this.bytes.slice(this.offset, this.offset + len)
            this.offset += len
            return rst
        }
        return null
    }

    // Read 1 byte
    public readU8(): number | null {
        let buf = this.readBytes(1)
        if (buf !== null) {
            return buf[0]
        }
        return null
    }

    // Read 4 bytes to u32
    public readU32(): number | null {
        let buff = this.readBytes(4)
        if (buff !== null) {
            return new DataView(buff.buffer).getUint32(0)
        }
        return null
    }

    // Read all the remaining bytes
    public readToEnd(): Uint8Array | null {
        let n = this.bytes.length - this.offset
        if (n > 0) {
            return this.readBytes(n)
        }
        return null
    }

    // u32 to bytes (little-endian)
    // 100 -> [0, 0, 0, 100]
    public static u32Bytes(u32: number): Uint8Array {
        let view = new DataView(new ArrayBuffer(4))
        view.setUint32(0, u32, false)
        return new Uint8Array(view.buffer)
    }
}

export class KwrapFile {
    // File ID: \xffKWRAP
    static fileID = new Uint8Array([255, 75, 87, 82, 65, 80])
    // 1 byte
    version = 0
    // 32 bytes
    salt = new Uint8Array()
    // 4 bytes
    iterations = 0
    // n bytes
    data = new Uint8Array()

    // DATA: JSON '[]' 2
    // NONCE: 12, DATA: N, TAG: 16
    static minimumData = 12 + 2 + 16

    private static verifyFileID(id: Uint8Array) {
        if (id.byteLength !== KwrapFile.fileID.byteLength) {
            return false
        }
        for (let i = 0; i <= id.byteLength; i++) {
            if (id[i] != KwrapFile.fileID[i]) {
                return false
            }
        }
        return true
    }

    constructor(salt: Uint8Array, iterations: number, data: Uint8Array) {
        this.version = 1
        this.salt = salt
        this.iterations = iterations
        this.data = data
    }

    // TODO
    // Handle error
    static async parse(file: File): Promise<KwrapFile> {
        let bytes = new Bytes(await fileToBytes(file))
        let id = bytes.readBytes(6)
        if (id === null || !KwrapFile.verifyFileID(id)) {
            throw new Error('ID Error')
        }
        let version = bytes.readU8()
        if (version !== 1) {
            throw new Error('Version Error')
        }
        let salt = bytes.readBytes(32)
        if (salt === null) {
            throw new Error('Salt Error')
        }
        let iterations = bytes.readU32()
        if (iterations === null || iterations === 0) {
            throw new Error('Iterations Error')
        }
        let data = bytes.readToEnd()
        if (data === null || data.byteLength < KwrapFile.minimumData) {
            throw new Error('Data Error')
        }
        return new KwrapFile(salt, iterations, data)
    }

    public bytes(): Uint8Array {
        let buffer = new Uint8Array(6 + 1 + 32 + 4 + this.data.length)
        buffer.set(KwrapFile.fileID, 0)
        buffer.set(new Uint8Array([1]), 6)
        buffer.set(this.salt, 7)
        buffer.set(Bytes.u32Bytes(this.iterations), 39)
        buffer.set(this.data, 43)
        return buffer
    }
}
