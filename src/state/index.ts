import {
    atom,
    Sort,
    Tag,
    TagType,
    selector,
    Password,
    searchPassword,
    splitPasswords,
    sortPasswords,
    emptyPassword
} from '../lib'

export const GLOBAL_STATE = atom({
    key: 'globalState',
    default: {
        readonly: true,
        iterations: 0
    }
})

export const PASSWORDS = atom<Password[]>({
    key: 'passwords',
    default: []
})

export const PASSWORDS_FILTER = atom({
    key: 'passwordsFilter',
    default: {
        keyword: '',
        tag: TagType.All as Tag,
        sort: Sort.Default
    }
})

export const PASSWORDS_FILTERED = selector({
    key: 'passwordsFiltered',
    get: ({ get }) => {
        const filter = get(PASSWORDS_FILTER)
        const list = get(PASSWORDS)

        let passwords = []
        let keyword = filter.keyword.toLocaleLowerCase()
        if (keyword !== '') {
            passwords = list.filter((item) => searchPassword(item.data, keyword))
        } else if (filter.tag === TagType.All) {
            passwords = list.filter((item) => item.data.archive !== true)
        } else if (filter.tag === TagType.Archive) {
            passwords = list.filter((item) => item.data.archive === true)
        } else {
            // Filter tag
            passwords = list
                .filter((item) => item.data.archive !== true)
                .filter((item) => (item.data.tags ?? []).includes(filter.tag as string))
        }

        let [pins, unpins] = splitPasswords(passwords)
        sortPasswords(pins, filter.sort, true)
        sortPasswords(unpins, filter.sort, false)

        return pins.concat(unpins)
    }
})

export enum DetailPage {
    None,
    Preview,
    Edit
}

export const DETAIL_PAGE = atom({
    key: 'detailPage',
    default: DetailPage.None
})

export const PREVIEW_DATA = atom({
    key: 'previewData',
    default: emptyPassword()
})

export const EDIT_DATA = atom({
    key: 'editData',
    default: emptyPassword()
})
