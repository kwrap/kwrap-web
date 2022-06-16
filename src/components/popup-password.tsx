import {
    React,
    useEffect,
    useState,
    GenerateOption,
    passwordGenerate,
    DEFAULT_OPTION
} from '../lib'
import { Popup } from './common/popup'
import { Checkbox } from './common/checkbox'
import { Chunk, ChunkGroup } from './common/chunk'
import { IconLock } from './common/icons'

interface Props {
    onComplete: (password?: string) => void
}

export const PopupPassword = ({ onComplete }: Props) => {
    const [password, setPassword] = useState<string>('')
    const [options, setOptions] = useState<GenerateOption>({ ...DEFAULT_OPTION })
    useEffect(() => {
        setPassword(passwordGenerate(options))
    }, [options])

    return (
        <Popup
            title='Password'
            cancelText='Cancel'
            okText='Fill Password'
            onCancel={() => onComplete()}
            onOk={() => onComplete(password)}
            className='w-96'
        >
            <ChunkGroup>
                <Chunk
                    icon={IconLock}
                    centerChildren={
                        <input
                            className='input text-lg tracking-wider'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    }
                    copyText={password}
                    onRefresh={() => setPassword(passwordGenerate(options))}
                />
            </ChunkGroup>

            <div className='flex items-center mb-3'>
                <span className='w-20 dark:text-gray-200'>Length: </span>
                <input
                    className='flex-1'
                    type='range'
                    min={6}
                    max={64}
                    value={options.length}
                    onChange={(e) => setOptions({ ...options, length: Number(e.target.value) })}
                />
                <span className='w-10 text-center dark:text-gray-200'>{options.length}</span>
            </div>

            <div className='flex items-center'>
                <span className='w-20 dark:text-gray-200'>Options: </span>
                <div className='flex-1 flex gap-3 flex-wrap'>
                    <Checkbox
                        label='a-z'
                        checked={options.includeLowercase}
                        onChange={(includeLowercase) =>
                            setOptions({ ...options, includeLowercase })
                        }
                    />
                    <Checkbox
                        label='A-Z'
                        checked={options.includeUppercase}
                        onChange={(includeUppercase) =>
                            setOptions({ ...options, includeUppercase })
                        }
                    />
                    <Checkbox
                        label='0-9'
                        checked={options.includeNumbers}
                        onChange={(includeNumbers) => setOptions({ ...options, includeNumbers })}
                    />
                    <Checkbox
                        label='@#$'
                        checked={options.includeSymbols}
                        onChange={(includeSymbols) => setOptions({ ...options, includeSymbols })}
                    />
                </div>
            </div>
        </Popup>
    )
}
