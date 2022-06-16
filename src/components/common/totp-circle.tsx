import { React } from '../../lib'

interface Props {
    now: number
    total: number
}

export const TotpCircle = ({ now, total }: Props) => {
    return (
        <div className='w-8 h-8 relative flex justify-center items-center'>
            <svg viewBox='0 0 100 100' className='absolute inset-0'>
                <circle
                    className='stroke-theme'
                    fill='none'
                    strokeWidth={12}
                    r={44}
                    cx={50}
                    cy={50}
                    strokeLinecap='round'
                    // strokeDasharray={'0'}
                    // strokeDashoffset={0}
                />
            </svg>
            <span className='text-font dark:text-gray-100 text-sm'>{now}</span>
        </div>
    )
}
