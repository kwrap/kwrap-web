import { React, classNames } from '../../lib'

interface HideProps {
    hide: boolean
    content: string
    fullWidth?: boolean
}

export const Hide = ({ hide, content, fullWidth }: HideProps) => {
    if (hide) {
        return (
            <span
                className={classNames(
                    'block h-[18px] rounded-lg bg-gray-200 dark:bg-dark-select animate-alert',
                    {
                        'w-3/4': !fullWidth,
                        'w-full': fullWidth
                    }
                )}
            />
        )
    }
    return <span className='whitespace-pre-wrap text-font dark:text-gray-100'>{content}</span>
}
