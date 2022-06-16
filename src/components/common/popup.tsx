import { React, classNames } from '../../lib'

import { Button } from './button'

interface Props {
    className?: string
    title: string
    children: React.ReactNode
    cancelText?: string
    okText: string
    onCancel?: (isCloseButton: boolean) => void
    onOk: () => void
}

export const Popup = (props: Props) => {
    return (
        <div className='fixed inset-0 z-10 bg-black bg-opacity-40 flex justify-center items-center animate-bg-show'>
            <div className='max-w-full bg-white dark:bg-black rounded-md shadow-md animate-alert'>
                <div className='h-12 text-gray-800 text-lg border-b flex items-center justify-between px-4 dark:border-gray-700 dark:text-gray-100'>
                    {props.title}
                </div>

                <div className={classNames('overscroll-y-contain p-6 max-w-full', props.className)}>
                    {props.children}
                </div>

                <div className='border-t px-3 py-4 flex justify-end items-center gap-6 dark:border-gray-700'>
                    {props.cancelText && (
                        <Button
                            className='h-9 px-9 border border-theme text-theme rounded-md'
                            onClick={() => props.onCancel && props.onCancel(false)}
                        >
                            {props.cancelText}
                        </Button>
                    )}
                    <Button
                        className='h-9 px-9 text-white bg-theme rounded-md'
                        onClick={() => props.onOk && props.onOk()}
                    >
                        {props.okText}
                    </Button>
                </div>
            </div>
        </div>
    )
}
