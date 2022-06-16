import * as toast from '../components/common/toast'
import * as crypto from './crypto'
import { Password, EncryptedPassword, PasswordData, PasswordId } from './password'
import { fetchEventSource } from '@microsoft/fetch-event-source'

export interface SseEvent {
    onChangeState(state: SseState): void
    reauthorize(): void
    created(passwords: Password[]): void
    updated(password: Password): void
    deleted(password: PasswordId): void
}

export enum SseState {
    Connecting,
    Open
}

export interface Request {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    path: string
    auth: boolean
    sseID: boolean
    data?: any
}

type Headers = {
    [key: string]: string
}

const AUTHORIZATION = 'authorization'
const SSE_IGNORE = 'sse-ignore'

class Client {
    private sseID = window.crypto.randomUUID()

    private baseURL = ''
    private basicAuth = ''
    private key: CryptoKey | any = null

    constructor() {}

    private request(req: Request): Promise<any> {
        return new Promise((success, error) => {
            let headers: Headers = {
                'Content-Type': 'application/json'
            }
            if (req.auth) {
                headers[AUTHORIZATION] = this.basicAuth
            }
            if (req.sseID) {
                headers[SSE_IGNORE] = this.sseID
            }
            fetch(this.baseURL + req.path, {
                mode: 'cors',
                cache: 'no-store',
                method: req.method,
                headers,
                body: req.data && JSON.stringify(req.data)
            })
                .then(async (res) => {
                    // TODO: Error code
                    switch (res.status) {
                        case 200: {
                            success(await res.json())
                            return
                        }
                        default: {
                            let data = await res.json()
                            error(data)
                            toast.error(data.message)
                            return
                        }
                    }
                })
                .catch((e) => {
                    error({})
                    return toast.error('Unable to access the server')
                })
        })
    }

    public set cryptoKey(value: CryptoKey) {
        this.key = value
    }

    public setBaseURL(url: string) {
        if (url.endsWith('/')) {
            url = url.slice(0, -1)
        }
        this.baseURL = url
    }

    public async setBasicAuth(username: string, password: Uint8Array) {
        let u = await crypto.sha256(username)
        let p = crypto.binToBase64(password)
        this.basicAuth = 'Basic ' + window.btoa(`${u}:${p}`)
    }

    resetClient() {
        this.basicAuth = ''
        this.key = null
    }

    public sse(event: SseEvent) {
        let url = `${this.baseURL}/sse`
        let ctrl = new AbortController()
        fetchEventSource(url, {
            openWhenHidden: true,
            signal: ctrl.signal,
            mode: 'cors',
            headers: {
                [AUTHORIZATION]: this.basicAuth,
                [SSE_IGNORE]: this.sseID
            },
            onopen: async (response) => {
                if (response.ok) {
                    event.onChangeState(SseState.Open)
                    return
                }
                if (response.status === 401) {
                    ctrl.abort()
                    this.resetClient()
                    event.reauthorize()
                    return
                }
                // TODO: Retry
            },
            onerror() {
                event.onChangeState(SseState.Connecting)
            },
            onmessage: async (e) => {
                switch (e.event) {
                    case 'reauthorize': {
                        this.resetClient()
                        ctrl.abort()
                        event.reauthorize()
                        break
                    }
                    case 'created': {
                        let passwords: EncryptedPassword[] = JSON.parse(e.data)
                        let all = passwords.map(async (item) => {
                            return {
                                id: item.id,
                                data: await crypto.decryptFromBase64(this.key, item.data)
                            }
                        })
                        event.created(await Promise.all(all))
                        break
                    }
                    case 'updated': {
                        let pw: EncryptedPassword = JSON.parse(e.data)
                        event.updated({
                            id: pw.id,
                            data: await crypto.decryptFromBase64(this.key, pw.data)
                        })
                        break
                    }
                    case 'deleted': {
                        let id = JSON.parse(e.data)
                        event.deleted(id)
                        break
                    }
                }
            }
        })
    }

    public async createUser(username: string, password: string): Promise<null> {
        let salt = crypto.randSalt()
        let passwordHash = await crypto.pbkdf2(password, salt, crypto.DEFAULT_ITERATIONS)
        return this.request({
            method: 'POST',
            path: '/user',
            auth: false,
            sseID: false,
            data: {
                username: await crypto.sha256(username),
                password: crypto.binToBase64(passwordHash),
                asalt: crypto.binToBase64(salt),
                esalt: crypto.binToBase64(crypto.randSalt()),
                iterations: crypto.DEFAULT_ITERATIONS
            }
        })
    }

    public async userPrelogin(username: string): Promise<{
        asalt: Uint8Array
        iterations: number
    }> {
        return this.request({
            method: 'GET',
            path: `/user/prelogin/${await crypto.sha256(username)}`,
            auth: false,
            sseID: false
        }).then((res) => {
            return {
                asalt: crypto.base64ToBin(res.asalt),
                iterations: res.iterations
            }
        })
    }

    public deleteUser(): Promise<void> {
        return this.request({ method: 'DELETE', path: '/user', auth: true, sseID: true }).then(
            () => {
                this.resetClient()
            }
        )
    }

    public async changeUserPassword(
        newPassword: string,
        newIterations: number,
        passwords: Password[]
    ): Promise<void> {
        let asalt = crypto.randSalt()
        let esalt = crypto.randSalt()
        let passwordHash = await crypto.pbkdf2(newPassword, asalt, newIterations)
        let key = await crypto.deriveKey(newPassword, esalt, newIterations)
        let items = passwords.map(async (item) => {
            return {
                id: item.id,
                data: await crypto.encryptToBase64(key, item.data)
            }
        })

        return this.request({
            method: 'PUT',
            path: '/user/password',
            auth: true,
            sseID: true,
            data: {
                password: crypto.binToBase64(passwordHash),
                asalt: crypto.binToBase64(asalt),
                esalt: crypto.binToBase64(esalt),
                iterations: newIterations,
                passwords: await Promise.all(items)
            }
        }).then(() => {
            this.resetClient()
        })
    }

    public async encryptPasswords(): Promise<Uint8Array> {
        let passwords = (await this.passwordList()).map((item) => item.data)
        return await crypto.encryptPasswordData(this.key, passwords)
    }

    public async changeUsername(username: string): Promise<void> {
        return this.request({
            method: 'PUT',
            path: `/user/username`,
            data: {
                username: await crypto.sha256(username)
            },
            auth: true,
            sseID: true
        }).then(() => {
            this.resetClient()
        })
    }

    public userEsalt(): Promise<Uint8Array> {
        return this.request({
            method: 'GET',
            path: '/user/esalt',
            auth: true,
            sseID: false
        }).then((res) => {
            return crypto.base64ToBin(res.esalt)
        })
    }

    public passwordList(): Promise<Password[]> {
        return this.request({
            method: 'GET',
            path: '/passwords',
            auth: true,
            sseID: false
        }).then((res: EncryptedPassword[]) => {
            let items = res.map(async (item) => {
                return {
                    id: item.id,
                    data: await crypto.decryptFromBase64(this.key, item.data)
                }
            })
            return Promise.all(items)
        })
    }

    public async createPassword(data: PasswordData): Promise<string> {
        return this.request({
            method: 'POST',
            path: '/passwords',
            auth: true,
            sseID: true,
            data: [{ data: await crypto.encryptToBase64(this.key, data) }]
        }).then((res) => res[0].id)
    }

    public async updatePassword(id: string, data: PasswordData): Promise<null> {
        return this.request({
            method: 'PUT',
            path: '/passwords',
            auth: true,
            sseID: true,
            data: {
                id: id,
                data: await crypto.encryptToBase64(this.key, data)
            }
        })
    }

    public deletePassword(id: string): Promise<null> {
        return this.request({
            method: 'DELETE',
            path: `/passwords`,
            data: {
                id: id
            },
            auth: true,
            sseID: true
        })
    }
}

export const http = new Client()
