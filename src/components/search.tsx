import { React, useRecoilState } from '../lib'
import { PASSWORDS_FILTER } from '../state'
import { IconClose, IconSearch } from './common/icons'

export const Search = () => {
    const [filter, setFilter] = useRecoilState(PASSWORDS_FILTER)

    return (
        <div className='px-2 flex items-center gap-2 bg-gray-100 rounded-lg  h-10  dark:bg-dark-light'>
            <IconSearch className='h-5 w-5 text-font dark:text-gray-200' />
            <input
                type='text'
                placeholder='Search'
                className='input flex-1'
                value={filter.keyword}
                onChange={(e) => {
                    setFilter({ ...filter, keyword: e.target.value.trim() })
                }}
            />
            {filter.keyword !== '' && (
                <IconClose
                    className='h-6 w-6 text-font dark:text-gray-200'
                    onClick={() => {
                        setFilter({ ...filter, keyword: '' })
                    }}
                />
            )}
        </div>
    )
}
