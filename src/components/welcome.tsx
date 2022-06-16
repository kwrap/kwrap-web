import {
    http,
    crypto,
    utils,
    localData,
    KwrapFile,
    useState,
    useEffect,
    useRef,
    React,
    useSetRecoilState
} from '../lib'
import { GLOBAL_STATE, PASSWORDS } from '../state'
import * as toast from './common/toast'
import { Button } from './common/button'
import { Chunk, ChunkGroup } from './common/chunk'
import { IconUser, IconServer } from './common/icons'
import { IconLock } from './common/icons'

enum UseType {
    SignIn,
    SignUp,
    PasswordLibrary
}

interface Props {
    onSignInSuccess(): void
    onLoadFileSuccess(): void
}

export const Welcome = ({ onSignInSuccess, onLoadFileSuccess }: Props) => {
    const setGlobalState = useSetRecoilState(GLOBAL_STATE)
    const setPasswords = useSetRecoilState(PASSWORDS)
    const [useType, setuseType] = useState(UseType.SignIn)
    const [username, setUsername] = useState('')
    const usernameInput = useRef<HTMLInputElement>(null)
    const [password, setPassword] = useState('')
    const passwordInput = useRef<HTMLInputElement>(null)
    const [server, setServer] = useState('')
    const [passwordShow, setPasswordShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [kwrapFile, setKwrapFile] = useState<KwrapFile | null>(null)

    useEffect(() => {
        setServer(localData.server || '')
        let name = localData.username || ''
        setUsername(name)
        if (name === '') {
            usernameInput.current?.focus()
        } else {
            passwordInput.current?.focus()
        }
    }, [])

    const onSignUp = async () => {
        setLoading(true)
        try {
            await http.createUser(username, password)
            setuseType(UseType.SignIn)
            toast.success('Create successful')
        } catch (_) {}
        setLoading(false)
    }

    const onSignIn = async () => {
        setLoading(true)
        try {
            let { asalt, iterations } = await http.userPrelogin(username)
            let hash = await crypto.pbkdf2(password, asalt, iterations)
            await http.setBasicAuth(username, hash)
            let esalt = await http.userEsalt()
            http.cryptoKey = await crypto.deriveKey(password, esalt, iterations)
            setGlobalState({ readonly: false, iterations })
            onSignInSuccess()
            localData.username = username
            toast.success('Login successful')
        } catch (_) {}
        setLoading(false)
    }

    const onDecryptFile = async () => {
        setLoading(true)
        let kwrap = kwrapFile as KwrapFile
        try {
            let key = await crypto.deriveKey(password, kwrap.salt, kwrap.iterations)
            let passwords = (await crypto.decryptFileData(key, kwrap.data)).map((item) => {
                return {
                    id: window.crypto.randomUUID(),
                    data: item
                }
            })
            setGlobalState({ readonly: true, iterations: kwrap.iterations })
            setPasswords(passwords)
            onLoadFileSuccess()
            toast.success('Login successful')
        } catch (_) {
            toast.error('Password error')
            passwordInput.current?.focus()
        }
        setPassword('')
        setLoading(false)
    }

    const onSubmit = () => {
        if (useType === UseType.PasswordLibrary) {
            return onDecryptFile()
        }
        if (!utils.verifyURL(server)) {
            localData.server = null
            toast.error('Invalid API URL')
            return
        }
        localData.server = server
        http.setBaseURL(server)
        useType === UseType.SignIn ? onSignIn() : onSignUp()
    }

    const onSwitchSubmit = () => {
        setuseType(useType === UseType.SignIn ? UseType.SignUp : UseType.SignIn)
        setUsername('')
        setPassword('')
        setKwrapFile(null)
    }

    const onLoadKwrapFile = async (e: any) => {
        setLoading(true)
        let file: File = e.target.files[0]
        try {
            setKwrapFile(await KwrapFile.parse(file))
            setPassword('')
            setuseType(UseType.PasswordLibrary)
            toast.success('Please enter the password')
            passwordInput.current?.focus()
        } catch (e) {
            toast.error('Invalid kwrap file')
        }
        setLoading(false)
    }

    return (
        <div className='w-full sm:max-w-sm mx-auto p-6'>
            <img className='w-28 h-28 mx-auto' src='./logo.svg' alt='logo' />
            <h1 className='py-6 text-center text-4xl text-gray-700 font-light dark:text-gray-100'>
                开始使用 Kwrap
            </h1>
            <p className='mb-6 text-base text-gray-600 text-center font-light'>
                Simple and secure password manager
            </p>

            <ChunkGroup>
                {useType !== UseType.PasswordLibrary && (
                    <Chunk
                        icon={IconUser}
                        centerChildren={
                            <input
                                ref={usernameInput}
                                className='input'
                                type='text'
                                placeholder='Username'
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                onKeyUp={(e) => e.code === 'Enter' && onSubmit()}
                            />
                        }
                        onClear={
                            username === ''
                                ? undefined
                                : () => {
                                      localData.username = null
                                      setUsername('')
                                  }
                        }
                    />
                )}

                <Chunk
                    icon={IconLock}
                    centerChildren={
                        <input
                            ref={passwordInput}
                            className='input'
                            placeholder='Master Password'
                            type={passwordShow ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyUp={(e) => e.code === 'Enter' && onSubmit()}
                        />
                    }
                    show={passwordShow}
                    onChangeShow={() => setPasswordShow(!passwordShow)}
                    onClear={password === '' ? undefined : () => setPassword('')}
                />

                {useType !== UseType.PasswordLibrary && (
                    <Chunk
                        icon={IconServer}
                        centerChildren={
                            <input
                                className='input'
                                type='url'
                                placeholder='https://example.com/'
                                value={server}
                                onChange={(e) => setServer(e.target.value)}
                                onKeyUp={(e) => e.code === 'Enter' && onSubmit()}
                            />
                        }
                        onClear={server === '' ? undefined : () => setServer('')}
                    />
                )}
            </ChunkGroup>

            <Button
                className='w-full h-12 sm:h-11 rounded-lg bg-theme text-white'
                disabled={loading}
                onClick={onSubmit}
            >
                {useType === UseType.PasswordLibrary
                    ? 'Continue'
                    : useType === UseType.SignIn
                    ? 'Sign in'
                    : 'Create Account'}
            </Button>

            {!loading && (
                <>
                    <div className='text-center my-4 text-gray-500'>OR</div>

                    <Button
                        className='w-full h-12 sm:h-11 rounded-lg bg-gray-100 dark:bg-dark-select text-font dark:text-gray-300 mb-6'
                        onClick={onSwitchSubmit}
                    >
                        {useType === UseType.SignIn ? 'Create Account' : 'Sign in'}
                    </Button>

                    {useType !== UseType.PasswordLibrary && (
                        <Button className='w-full h-12 sm:h-11 rounded-lg bg-gray-100 dark:bg-dark-select text-font dark:text-gray-300 mb-6 relative'>
                            Use Password Library
                            <input
                                type='file'
                                accept='.kwrap'
                                className='absolute inset-0 opacity-0 cursor-pointer'
                                onChange={onLoadKwrapFile}
                            />
                        </Button>
                    )}
                </>
            )}
        </div>
    )
}
