import { React, classNames } from '../../lib'
import { IconSuccess } from './icons'

interface Props {
    label: string
    checked: boolean
    onChange(checked: boolean): void
}

export const Checkbox = ({ checked, label, onChange }: Props) => {
    return (
        <div className='flex items-center' onClick={() => onChange(!checked)} tabIndex={0}>
            <div
                className={classNames(
                    'flex w-5 h-5 border rounded transition',
                    checked && 'bg-theme border-0'
                )}
            >
                {checked && <IconSuccess className='w-full h-full text-white animate-alert' />}
            </div>
            <span className='text-sm ml-2 select-none text-gray-600 dark:text-gray-200'>
                {label}
            </span>
        </div>
    )
}
