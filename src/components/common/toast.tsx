import { React, createRoot, ReactDomRoot } from '../../lib'
import { IconClose, IconSuccess } from './icons'

interface Props {
    msg: string
    success: boolean
}

const Toast = ({ msg, success }: Props) => {
    return (
        <div className='fixed z-50 top-16 inset-x-0 pointer-events-none flex justify-center px-4'>
            <div className='pointer-events-auto bg-white py-2 px-6 rounded shadow-md text-black text-lg break-all animate-alert flex items-center'>
                {success ? (
                    <IconSuccess className='h-6 w-6 text-green-600 mr-2' />
                ) : (
                    <IconClose className='h-6 w-6 text-red-600 mr-2' />
                )}
                {msg}
            </div>
        </div>
    )
}

let root: ReactDomRoot | undefined
let el: HTMLDivElement | undefined
let timer: number | undefined

const clearToast = () => {
    if (root) {
        root.unmount()
        root = undefined
    }
    if (el) {
        document.body.removeChild(el)
        el = undefined
    }
    if (timer) {
        window.clearTimeout(timer)
        timer = undefined
    }
}

const create = (msg: string, success: boolean) => {
    clearToast()

    el = document.createElement('div')
    document.body.appendChild(el)
    root = createRoot(el)
    root.render(<Toast msg={msg} success={success} />)

    timer = setTimeout(() => {
        clearToast()
    }, 3 * 1000)
}

export const success = (msg: string) => {
    create(msg, true)
}

export const error = (msg: string) => {
    create(msg, false)
}
