import { React, classNames } from '../../lib'
import { IconLoading } from './icons'

interface Props {
    disabled?: boolean
}

export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement> & Props) => {
    let { className, disabled, children, ...args } = props
    return (
        <button
            className={classNames(
                'relative flex justify-center items-center disabled:opacity-60 disabled:cursor-wait transition-all enabled:active:scale-95 enabled:hover:opacity-90',
                className
            )}
            disabled={disabled}
            {...args}
        >
            {disabled && <IconLoading className='w-5 h-5 mr-2 animate-spin' />}
            {children}
        </button>
    )
}
