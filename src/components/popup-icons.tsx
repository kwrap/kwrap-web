import { React, useState, icons, classNames } from '../lib'
import { Popup } from './common/popup'
import { PasswordIcon } from './password-icon'

interface Props {
    onCancel: () => void
    onSelect: (icon: string) => void
}

export const PopupIcons = ({ onCancel, onSelect }: Props) => {
    const [selected, setSelected] = useState('')
    return (
        <Popup
            className='w-[540px] max-h-96 overflow-y-auto'
            title='Icons'
            cancelText='Cancel'
            okText='OK'
            onCancel={onCancel}
            onOk={() => onSelect(selected)}
        >
            <div className='grid gap-2 grid-cols-[repeat(auto-fill,minmax(76px,1fr))]'>
                {icons.icons.map((item) => {
                    return (
                        <div
                            className={classNames(
                                'flex flex-col items-center rounded py-2 border transition',
                                item.name === selected ? 'border-theme' : 'border-transparent'
                            )}
                            onClick={() => setSelected(item.name)}
                            key={item.name}
                        >
                            <PasswordIcon name={item.name} />
                            <p className='text-xs text-gray-500 mt-2'>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </Popup>
    )
}
