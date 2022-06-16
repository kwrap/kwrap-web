import { React, classNames } from '../../lib'
import { IconClose } from './icons'

interface Props {
    className?: string
    tags: string[]
    onDelete?(tag: string): void
}

export const Tags = ({ className, tags, onDelete }: Props) => {
    if (tags.length === 0) {
        return null
    }
    return (
        <div className={classNames('flex flex-wrap gap-2 select-none px-3 py-3', className)}>
            {tags.map((tag) => {
                return (
                    <div
                        key={tag}
                        className='inline-flex items-center h-[26px] px-4 rounded text-sm text-white bg-theme'
                    >
                        {tag}
                        {onDelete && (
                            <IconClose
                                className='h-4 w-4 ml-1'
                                onClick={() => {
                                    onDelete(tag)
                                }}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
