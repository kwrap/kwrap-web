import { React, utils } from '../../lib'
import {
    IconProps,
    IconShow,
    IconClose,
    IconRemove,
    IconHidden,
    IconCopy,
    IconHref,
    IconRefresh
} from './icons'

interface ChunkGroupProps {
    children: React.ReactNode
    footer?: React.ReactNode
}

export const ChunkGroup = (props: ChunkGroupProps) => {
    return (
        <div className='mb-4'>
            <div className='rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-light'>
                {props.children}
            </div>
            {props.footer}
        </div>
    )
}

interface ChunkProps {
    onClick?: () => void
    paddingX?: boolean
    paddingY?: boolean
    icon?: React.FC<IconProps>
    text?: string
    centerChildren?: React.ReactNode
    bottomChildren?: React.ReactNode
    copyText?: string
    linkTo?: string
    show?: boolean
    onChangeShow?: (show: boolean) => void
    onRefresh?: () => void
    onClear?: () => void
    onRemove?: () => void
}

export const Chunk = (props: ChunkProps) => {
    let {
        onClick,
        icon,
        text,
        centerChildren,
        bottomChildren,
        copyText,
        show,
        onChangeShow,
        linkTo,
        onRefresh,
        onClear,
        onRemove
    } = props
    let Icon = icon
    const iconClassName = 'w-6 h-6 sm:w-5 sm:h-5 text-font dark:text-gray-200'

    return (
        <div
            className='w-full px-3 border-b dark:border-dark-border last:border-0'
            onClick={props.onClick}
        >
            <div className='h-14 sm:h-12 flex items-center gap-3'>
                {Icon !== undefined && <Icon className={iconClassName} />}

                {text !== undefined && <span className='text-theme'>{text}</span>}

                <div className='flex-1 h-full flex items-center'>{centerChildren}</div>

                {show !== undefined && show === true && (
                    <IconHidden
                        className={iconClassName}
                        onClick={() => {
                            onChangeShow && onChangeShow(false)
                        }}
                    />
                )}
                {show !== undefined && show === false && (
                    <IconShow
                        className={iconClassName}
                        onClick={() => {
                            onChangeShow && onChangeShow(true)
                        }}
                    />
                )}

                {onRefresh !== undefined && (
                    <IconRefresh className={iconClassName} onClick={onRefresh} />
                )}

                {linkTo !== undefined && (
                    <a href={linkTo} target='_blank'>
                        <IconHref className={iconClassName} />
                    </a>
                )}

                {copyText !== undefined && (
                    <IconCopy
                        className={iconClassName}
                        onClick={() => utils.copyText(copyText as string)}
                    />
                )}

                {onClear !== undefined && <IconClose className={iconClassName} onClick={onClear} />}

                {onRemove !== undefined && (
                    <IconRemove className='w-6 h-6 sm:w-5 sm:h-5 text-red-600' onClick={onRemove} />
                )}
            </div>

            {bottomChildren !== undefined && <div className='pb-3'>{bottomChildren}</div>}
        </div>
    )
}
