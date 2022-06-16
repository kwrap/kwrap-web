import { React, DEFAULT_NAME, classNames, TagType, useRecoilState, useRecoilValue } from '../lib'
import { PASSWORDS_FILTERED, PASSWORDS_FILTER } from '../state'
import { IconPin, IconSad, IconHappy, IconPlus } from './common/icons'
import { PasswordIcon } from './password-icon'
import { Button } from './common/button'

interface Props {
    loading: boolean
    selected: string
    onChangeSelected(selected: string): void
    onClickCreate(): void
}

export const List = ({ loading, selected, onChangeSelected, onClickCreate }: Props) => {
    const [filter] = useRecoilState(PASSWORDS_FILTER)
    const passwords = useRecoilValue(PASSWORDS_FILTERED)
    const isFilter = filter.keyword !== '' || filter.tag !== TagType.All
    const noneData = !loading && passwords.length === 0 && isFilter
    const canCreate = !loading && passwords.length === 0 && !isFilter

    return (
        <div className='flex-1 overflow-y-auto pb-12 sm:pb-6 select-none rounded-lg bg-gray-50 dark:bg-dark-light sm:bg-transparent dark:sm:bg-transparent'>
            {passwords.map((item, i) => {
                return (
                    <div
                        className={classNames(
                            'flex items-center transition-colors rounded',
                            item.id === selected && 'bg-gray-100 dark:bg-dark-select'
                        )}
                        key={item.id}
                        onClick={() => onChangeSelected(item.id)}
                    >
                        <PasswordIcon name={item.data.icon} className='mx-4' />
                        <div
                            className={classNames(
                                'flex-1 w-0 pt-2 pb-2 ',
                                item.id !== selected && passwords[i + 1]?.id !== selected
                                    ? 'border-b dark:border-dark-border'
                                    : 'border-b border-transparent dark:border-transparent'
                            )}
                        >
                            <h3 className='h-6 text-base overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-gray-200'>
                                {item.data.name || DEFAULT_NAME}
                            </h3>
                            <div className='h-5 flex items-center gap-2 pr-4'>
                                <span className='flex-1 text-sm text-gray-500 overflow-hidden overflow-ellipsis whitespace-nowrap dark:text-gray-400'>
                                    {item.data.user || item.data.email || item.data.phone}
                                </span>
                                {item.data.pin && (
                                    <IconPin className='w-5 h-5 sm:w-4 sm:h-4 text-gray-400' />
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}

            {loading && <ListLoading />}

            {noneData && <NoneData />}

            {canCreate && <NewPassword onClick={onClickCreate} />}
        </div>
    )
}

const ListLoading = () => {
    return (
        <>
            {Array.from({ length: 12 }).map((_, i) => {
                return (
                    <div
                        key={i}
                        className={'flex items-center transition-colors rounded animate-pulse'}
                    >
                        <PasswordIcon className='mx-4' />
                        <div className='flex-1 w-0 py-2 border-b dark:border-dark-border'>
                            <div className='h-4 w-2/4 bg-gray-200 dark:bg-dark-border rounded-lg mb-[10px] mt-[2px]'></div>
                            <div className='h-[14px] w-4/5 bg-gray-300 dark:bg-dark-select rounded-lg mb-[2px]'></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

const NoneData = () => {
    return (
        <div className={'flex flex-col items-center gap-4 py-12 sm:py-6'}>
            <IconSad className='w-14 h-14 text-gray-200 dark:text-gray-600' />
            <p className='text-sm text-gray-500'>No related password</p>
        </div>
    )
}

interface NewPasswordProps {
    onClick(): void
}

const NewPassword = ({ onClick }: NewPasswordProps) => {
    return (
        <div className={'flex flex-col items-center gap-4 py-12 sm:py-6'}>
            <IconHappy className='w-14 h-14 text-blue-500' />
            <Button
                className='w-36 h-9 gap-1 rounded text-sm bg-theme text-white'
                onClick={onClick}
            >
                <IconPlus className='w-6 h-6 ' />
                New Password
            </Button>
        </div>
    )
}
