import { icons, classNames, React } from '../lib'

interface Props {
    className?: string
    name?: string
    onClick?: () => void
}

export const PasswordIcon = ({ name, className, onClick }: Props) => {
    const url = icons.url(name)
    const cls = classNames(
        'w-10 h-10 rounded bg-gray-200 dark:bg-dark-select animate-alert',
        className
    )

    if (url === undefined) {
        return <div className={cls} onClick={onClick}></div>
    } else {
        return <img className={cls} onClick={onClick} src={url} alt={name} loading='lazy' />
    }
}
