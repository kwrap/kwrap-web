import { React, TagType, useRecoilState } from '../lib'
import { PASSWORDS_FILTER } from '../state'

export const SearchTitle = () => {
    const [filter, _] = useRecoilState(PASSWORDS_FILTER)

    const displayTitle = () => {
        if (filter.keyword !== '') {
            return 'Search result'
        }
        if (filter.tag === TagType.All) {
            return 'Passwords'
        }
        if (filter.tag === TagType.Archive) {
            return 'Archived'
        }
        return filter.tag
    }

    return (
        <h3 className='text-sm font-medium text-gray-700 dark:text-gray-100'>{displayTitle()}</h3>
    )
}
