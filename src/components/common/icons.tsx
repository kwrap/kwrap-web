import { React } from '../../lib'

export type IconProps = React.SVGProps<SVGSVGElement>
type Props = IconProps

export const IconShow = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
            />
        </svg>
    )
}

export const IconHidden = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
            />
        </svg>
    )
}

export const IconCopy = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
            />
        </svg>
    )
}

export const IconUser = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
            />
        </svg>
    )
}

export const IconPhone = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'
            />
        </svg>
    )
}

export const IconEmail = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
            />
        </svg>
    )
}

export const IconLock = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
            />
        </svg>
    )
}

export const IconKey = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
            />
        </svg>
    )
}

export const IconServer = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
            />
        </svg>
    )
}

export const IconTime = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    )
}

export const IconNotes = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
            />
        </svg>
    )
}

export const IconRemove = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    )
}
export const IconSetting = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
            />
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
        </svg>
    )
}

export const IconRefresh = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
            />
        </svg>
    )
}

export const IconPlus = (props: Props) => {
    return (
        <svg viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4v16m8-8H4' />
        </svg>
    )
}

export const IconLoading = (props: Props) => {
    return (
        <svg viewBox='0 0 24 24' fill='currentColor' {...props}>
            <path d='M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z' />
        </svg>
    )
}

export const IconLeft = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
        </svg>
    )
}

export const IconClose = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M6 18L18 6M6 6l12 12'
            />
        </svg>
    )
}

export const IconSuccess = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M5 13l4 4L19 7'
            />
        </svg>
    )
}

export const IconLink = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
            />
        </svg>
    )
}

export const IconEdit = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
            />
        </svg>
    )
}

export const IconPin = (props: Props) => {
    return (
        <svg width='24' height='24' fill='none' viewBox='0 0 24 24' {...props}>
            <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.6}
                d='M8.75 7.75L7.75 4.75H16.25L15.25 7.75V10C18.25 11 18.25 14.25 18.25 14.25H5.75C5.75 14.25 5.75 11 8.75 10V7.75Z'
            />
            <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.6}
                d='M12 14.5V19.25'
            />
        </svg>
    )
}

export const IconHappy = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    )
}

export const IconSad = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.8}
                d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
        </svg>
    )
}

export const IconSystem = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            />
        </svg>
    )
}

export const IconLight = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
            />
        </svg>
    )
}

export const IconDark = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
            />
        </svg>
    )
}

export const IconTag = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
            />
        </svg>
    )
}

export const IconSort = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4'
            />
        </svg>
    )
}

export const IconSearch = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
        </svg>
    )
}

export const IconHref = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
            />
        </svg>
    )
}

export const IconArchive = (props: Props) => {
    return (
        <svg fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={1.8} {...props}>
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
            />
        </svg>
    )
}
