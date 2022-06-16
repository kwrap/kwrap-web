import {
    React,
    useState,
    useEffect,
    http,
    ColorTheme,
    localData,
    updateColorTheme,
    utils,
    crypto,
    KwrapFile,
    classNames,
    useRecoilState
} from '../lib'
import { GLOBAL_STATE } from '../state'
import { Button } from './common/button'
import { IconLeft } from './common/icons'
import { Chunk, ChunkGroup } from './common/chunk'
import { IconUser, IconLock, IconSystem, IconLight, IconDark } from './common/icons'

const { isValid } = utils

interface Props {
    onClose(): void
}

export const Setting = (props: Props) => {
    const [globalState] = useRecoilState(GLOBAL_STATE)
    const [activeTheme, setActiveTheme] = useState(ColorTheme.System)
    const [username, setUsername] = useState('')
    const [disableUsername, setDisableUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [iterations, setIterations] = useState(globalState.iterations)
    const [disablePassword, setDisablePassword] = useState(false)
    const [disableImport, setDisableImport] = useState(false)
    const [disableExport, setDisableExport] = useState(false)
    const [disableDelete, setDisableDelete] = useState(false)

    useEffect(() => setActiveTheme(localData.colorTheme), [])

    const onSubmitUsername = () => {
        setDisableUsername(true)
        http.changeUsername(username)
            .finally(() => setDisableUsername(false))
            .then(() => {})
    }

    const onSubmitPassword = async () => {
        setDisablePassword(true)
        let passwords = await http.passwordList()
        http.changeUserPassword(password, iterations, passwords)
            .finally(() => setDisablePassword(false))
            .then(() => {})
    }

    const onSubmitImport = async () => {}

    const onSubmitExport = async () => {
        setDisableExport(true)
        let salt = await http.userEsalt()
        let bytes = await http.encryptPasswords()
        let file = new KwrapFile(salt, globalState.iterations, bytes)
        let a = document.createElement('a')
        a.download = 'library.kwrap'
        a.href = window.URL.createObjectURL(new Blob([file.bytes()]))
        a.click()
        setDisableExport(false)
    }

    const onSubmitDelete = () => {
        setDisableDelete(true)
        http.deleteUser()
            .finally(() => setDisableDelete(false))
            .then(() => {})
    }

    return (
        <div className='container max-w-xl px-4 pt-4 pb-8 flex flex-col gap-6 animate-alert sm:animate-none'>
            <IconLeft className='h-5 w-5 dark:text-gray-100' onClick={() => props.onClose()} />

            <div className='flex flex-col gap-3'>
                <label className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                    Change Theme
                </label>
                <div className='flex gap-3 text-sm'>
                    {[ColorTheme.System, ColorTheme.Light, ColorTheme.Dark].map((item) => {
                        return (
                            <div
                                key={item}
                                className={classNames(
                                    'w-14 h-14 flex justify-center items-center flex-col border rounded',
                                    {
                                        'border-blue-600': item === activeTheme
                                    }
                                )}
                                onClick={() => {
                                    setActiveTheme(item)
                                    localData.colorTheme = item
                                    updateColorTheme()
                                }}
                            >
                                {item === ColorTheme.System ? (
                                    <IconSystem className='w-6 h-6 stroke-gray-100 dark:stroke-gray-700' />
                                ) : item === ColorTheme.Light ? (
                                    <IconLight className='w-6 h-6 stroke-red-500' />
                                ) : (
                                    <IconDark className='w-6 h-6 stroke-yellow-400' />
                                )}
                                {item}
                            </div>
                        )
                    })}
                </div>
            </div>

            {!globalState.readonly && (
                <>
                    <div className='flex flex-col gap-3'>
                        <label className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                            Change Username
                        </label>

                        <ChunkGroup>
                            <Chunk
                                icon={IconUser}
                                centerChildren={
                                    <input
                                        className='input'
                                        type='text'
                                        placeholder='New Username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                }
                                onClear={!isValid(username) ? undefined : () => setUsername('')}
                            />
                        </ChunkGroup>

                        <Button
                            className='w-28 h-9 bg-theme text-white rounded-md'
                            disabled={disableUsername}
                            onClick={onSubmitUsername}
                        >
                            Submit
                        </Button>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div className='grid grid-cols-2 gap-3'>
                            <label className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                                Change Password
                            </label>
                            <label className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                                Iterations
                            </label>
                            <ChunkGroup>
                                <Chunk
                                    icon={IconLock}
                                    centerChildren={
                                        <input
                                            className='input'
                                            type='password'
                                            placeholder='New Password'
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    }
                                    onClear={!isValid(password) ? undefined : () => setPassword('')}
                                />
                            </ChunkGroup>

                            <ChunkGroup>
                                <Chunk
                                    icon={IconLock}
                                    centerChildren={
                                        <input
                                            className='input'
                                            type='number'
                                            min={crypto.DEFAULT_ITERATIONS}
                                            max={10000000}
                                            value={iterations}
                                            onChange={(e) => setIterations(Number(e.target.value))}
                                        />
                                    }
                                />
                            </ChunkGroup>
                        </div>
                        <Button
                            className='w-28 h-9 bg-theme text-white rounded-md'
                            disabled={disablePassword}
                            onClick={onSubmitPassword}
                        >
                            Submit
                        </Button>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                            Import Passwords
                        </label>
                        <Button
                            className='w-28 h-9 bg-theme text-white rounded-md'
                            disabled={disableImport}
                            onClick={onSubmitImport}
                        >
                            Import
                        </Button>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                            Export Passwords
                        </label>
                        <Button
                            className='w-28 h-9 bg-theme text-white rounded-md'
                            disabled={disableExport}
                            onClick={onSubmitExport}
                        >
                            Export
                        </Button>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <label className='text-sm font-medium text-gray-700 dark:text-gray-100'>
                            Delete Account
                        </label>
                        <Button
                            className='w-28 h-9 bg-red-600 text-white rounded-md'
                            disabled={disableDelete}
                            onClick={onSubmitDelete}
                        >
                            Delete
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
