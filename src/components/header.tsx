import { SseState, classNames, React, Sort, Tag, TagType, useRecoilState } from '../lib'
import { GLOBAL_STATE, PASSWORDS_FILTER } from '../state'
import { IconPlus, IconSetting, IconTag, IconSort, IconLoading } from './common/icons'
import { Select } from './common/select'

const SORT_LIST = [Sort.Default, Sort.Name, Sort.Update]

interface Props {
    sseState: SseState
    onClickAdd(): void
    onClickSetting(): void
    tags: string[]
}

export const Header = (props: Props) => {
    const [globalState] = useRecoilState(GLOBAL_STATE)
    const [filter, setFilter] = useRecoilState(PASSWORDS_FILTER)

    const tagIndex = () => {
        if (filter.tag === TagType.All) {
            return 0
        } else if (filter.tag === TagType.Archive) {
            return 1
        } else {
            return props.tags.findIndex((item) => item === filter.tag) + 2
        }
    }

    const tagValue = (i: number): Tag => {
        if (i === 0) {
            return TagType.All
        } else if (i === 1) {
            return TagType.Archive
        } else {
            return props.tags[i - 2]
        }
    }

    const iconClassNames = 'w-6 h-6 sm:w-5 sm:h-5 text-font dark:text-gray-200'

    return (
        <div className='flex items-center gap-4 h-14 sticky top-0 z-10 px-4 sm:px-0 -mx-4 sm:mx-0 bg-white dark:bg-black border-b dark:border-dark-border'>
            <IconSetting className={iconClassNames} onClick={props.onClickSetting} />

            <Select
                items={['All', 'Archived', ...props.tags]}
                selected={tagIndex()}
                onChange={(i) => {
                    setFilter({ ...filter, tag: tagValue(i) })
                }}
            >
                <IconTag
                    className={classNames(
                        iconClassNames,
                        filter.tag !== TagType.All && 'stroke-theme'
                    )}
                />
            </Select>

            <h1 className='absolute left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 text-font dark:text-gray-200'>
                Kwrap
                {props.sseState === SseState.Connecting && (
                    <IconLoading className='w-4 h-4 text-theme animate-spin' />
                )}
            </h1>

            <Select
                className='ml-auto'
                items={SORT_LIST}
                selected={SORT_LIST.findIndex((item) => item === filter.sort)}
                onChange={(i) => {
                    setFilter({ ...filter, sort: SORT_LIST[i] })
                }}
            >
                <IconSort
                    className={classNames(
                        iconClassNames,
                        filter.sort !== Sort.Default && 'stroke-theme'
                    )}
                />
            </Select>

            {!globalState.readonly && (
                <IconPlus className={iconClassNames} onClick={props.onClickAdd} />
            )}
        </div>
    )
}
