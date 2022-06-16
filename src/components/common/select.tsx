import { React, classNames } from '../../lib'

interface Props {
    className?: string
    items: string[]
    selected: number
    onChange(i: number): void
    children: React.ReactNode
}

export const Select = ({ className, items, selected, onChange, children }: Props) => {
    return (
        <div className={classNames('relative inline-block', className)}>
            {children}
            <select
                className='absolute inset-0 opacity-0'
                value={items[selected]}
                onChange={(e) => onChange(e.target.selectedIndex)}
            >
                {items.map((item) => {
                    return (
                        <option value={item} key={item}>
                            {item}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
