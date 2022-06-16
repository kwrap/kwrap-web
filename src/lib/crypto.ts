import { PasswordData, trimPasswordData } from './password'

export const binToBase64 = (bytes: Uint8Array): string => {
    return window.btoa(String.fromCharCode(...bytes))
}

export const base64ToBin = (base64: string): Uint8Array => {
    let str = window.atob(base64)
    let buf = new Uint8Array(str.length)
    for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i)
    }
    return buf
}

export const sha256 = async (content: string): Promise<string> => {
    const bytes = new TextEncoder().encode(content)
    const hash = await crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
}

export const randSalt = (): Uint8Array => {
    return window.crypto.getRandomValues(new Uint8Array(32))
}

export const randNonce = (): Uint8Array => {
    return window.crypto.getRandomValues(new Uint8Array(12))
}

export const DEFAULT_ITERATIONS = 1000000

export const deriveKey = async (
    password: string,
    salt: Uint8Array,
    iterations: number
): Promise<CryptoKey> => {
    let baseKey = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(password),
        'PBKDF2',
        false,
        ['deriveKey']
    )
    let key = await window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            hash: 'SHA-256',
            salt: salt,
            iterations: iterations
        },
        baseKey,
        {
            name: 'AES-GCM',
            length: 256
        },
        true,
        ['encrypt', 'decrypt']
    )
    return key
}

export const pbkdf2 = async (
    password: string,
    salt: Uint8Array,
    iterations: number
): Promise<Uint8Array> => {
    let key = await deriveKey(password, salt, iterations)
    let data = await crypto.subtle.exportKey('raw', key)
    return new Uint8Array(data)
}

export const encrypt = async (key: CryptoKey, bytes: Uint8Array): Promise<Uint8Array> => {
    let nonce = randNonce()
    let encrypted: ArrayBuffer = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: nonce
        },
        key,
        bytes
    )
    // Nonce + Data + Tag
    let rst = new Uint8Array(nonce.length + encrypted.byteLength)
    rst.set(nonce)
    rst.set(new Uint8Array(encrypted), nonce.length)
    return rst
}

export const decrypt = async <T>(key: CryptoKey, data: Uint8Array): Promise<T> => {
    let nonce = data.slice(0, 12)
    let encrypted = data.slice(12)
    let rst = await window.crypto.subtle.decrypt(
        {
            name: 'AES-GCM',
            iv: nonce
        },
        key,
        encrypted
    )
    let s = new TextDecoder().decode(rst)
    return JSON.parse(s)
}

export const encryptPasswordData = (
    key: CryptoKey,
    data: PasswordData | PasswordData[]
): Promise<Uint8Array> => {
    trimPasswordData(data)
    let bytes = new TextEncoder().encode(JSON.stringify(data))
    return encrypt(key, bytes)
}

export const encryptToBase64 = (key: CryptoKey, data: PasswordData): Promise<String> => {
    return encryptPasswordData(key, data).then((val) => binToBase64(val))
}

export const decryptFromBase64 = (key: CryptoKey, base64: string): Promise<PasswordData> => {
    return decrypt(key, base64ToBin(base64))
}

export const decryptFileData = (key: CryptoKey, bytes: Uint8Array): Promise<PasswordData[]> => {
    return decrypt(key, bytes)
}
