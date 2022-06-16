import {
    http,
    SseState,
    React,
    TagType,
    emptyPassword,
    useEffect,
    useState,
    useRecoilState,
    useSetRecoilState,
    Password
} from '../lib'
import {
    PASSWORDS,
    PASSWORDS_FILTER,
    EDIT_DATA,
    PREVIEW_DATA,
    DETAIL_PAGE,
    DetailPage
} from '../state'
import { Welcome } from '../components/welcome'
import { Setting } from '../components/setting'
import { Header } from '../components/header'
import { Search } from '../components/search'
import { SearchTitle } from '../components/search-title'
import { List } from '../components/password-list'
import { Detail } from '../components/password-detail'

enum Page {
    Welcome,
    Main,
    Setting
}

export const Main = () => {
    const [passwords] = useRecoilState(PASSWORDS)
    const setPasswords = useSetRecoilState(PASSWORDS)
    const [filter, setFilter] = useRecoilState(PASSWORDS_FILTER)
    const [detail, setDetail] = useRecoilState(DETAIL_PAGE)
    const [preview, setPreview] = useRecoilState(PREVIEW_DATA)
    const [edit, setEdit] = useRecoilState(EDIT_DATA)
    const [page, setPage] = useState(Page.Welcome)
    const [sseState, setSseState] = useState(SseState.Open)
    const [tags, setTags] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedID, setSelectedID] = useState('')

    useEffect(() => {
        // Update tags
        let tags = passwords
            .filter((item) => item.data.archive !== true)
            .map((item) => item.data.tags ?? [])
            .flat()
        setTags(Array.from(new Set(tags)))

        if (detail === DetailPage.Preview) {
            // The selected password has been deleted
            if (!passwords.map((item) => item.id).includes(preview.id)) {
                setSelectedID('')
                setDetail(DetailPage.None)
                return
            }
            // Update selected password data
            for (let item of passwords) {
                if (item.id === preview.id) {
                    setPreview(item)
                    break
                }
            }
        } else if (detail === DetailPage.Edit) {
            // The selected password has been deleted
            if (!passwords.map((item) => item.id).includes(edit.id)) {
                setEdit({
                    ...edit,
                    id: ''
                })
                return
            }
            // TODO: Password updated
        }
    }, [passwords])

    useEffect(() => {
        if (filter.tag !== TagType.All && filter.tag !== TagType.Archive) {
            if (!tags.includes(filter.tag)) {
                setFilter({ ...filter, tag: TagType.All })
            }
        }
    }, [tags])

    const onSignInSuccess = async () => {
        setPage(Page.Main)
        updatePasswords()
        startSse()
    }

    const onLoadFileSuccess = () => {
        setPage(Page.Main)
        setLoading(false)
        setSseState(SseState.Open)
    }

    const updatePasswords = async () => {
        let list = await http.passwordList()
        setPasswords(list)
        setLoading(false)
    }

    const startSse = () => {
        let update = false
        http.sse({
            onChangeState: (state) => {
                setSseState(state)
                if (state === SseState.Open) {
                    if (update) {
                        updatePasswords()
                    } else {
                        update = true
                    }
                }
            },
            reauthorize: () => {
                window.location.reload()
            },
            created: (pws) => {
                setPasswords((items) => {
                    let list = [...items]
                    for (let pw of pws) {
                        let i = list.findIndex((item) => item.id === pw.id)
                        if (i >= 0) {
                            list[i].data = pw.data
                        } else {
                            list.push(pw)
                        }
                    }
                    return list
                })
            },
            updated: (pw) => {
                setPasswords((items) => {
                    let list = [...items]
                    let i = list.findIndex((item) => item.id === pw.id)
                    if (i >= 0) {
                        list[i] = pw
                    } else {
                        list.push(pw)
                    }
                    return list
                })
            },
            deleted: (pw) => {
                setPasswords((items) => items.filter((item) => pw.id != item.id))
            }
        })
    }

    const onClickNewPassword = () => {
        setSelectedID('')
        setEdit(emptyPassword())
        setDetail(DetailPage.Edit)
    }

    const onChangeSelect = (id: string) => {
        setSelectedID(id)
        let pw = passwords.find((item) => item.id === id) as Password
        setPreview({ ...pw })
        setDetail(DetailPage.Preview)
    }

    return (
        <main className='container max-w-5xl sm:h-screen'>
            {page === Page.Welcome && (
                <Welcome onSignInSuccess={onSignInSuccess} onLoadFileSuccess={onLoadFileSuccess} />
            )}

            {page === Page.Setting && <Setting onClose={() => setPage(Page.Main)} />}

            {page === Page.Main && (
                <div className='container max-w-3xl flex gap-9 h-full'>
                    <div className='w-full flex flex-col gap-3 sm:w-72 px-4'>
                        <Header
                            sseState={sseState}
                            onClickAdd={onClickNewPassword}
                            onClickSetting={() => setPage(Page.Setting)}
                            tags={tags}
                        />

                        <Search />

                        <SearchTitle />

                        <List
                            loading={loading}
                            selected={selectedID}
                            onChangeSelected={onChangeSelect}
                            onClickCreate={onClickNewPassword}
                        />
                    </div>

                    {detail !== DetailPage.None && (
                        <Detail
                            onClose={() => {
                                setSelectedID('')
                                setDetail(DetailPage.None)
                            }}
                            onChangeSelect={(id) => setSelectedID(id)}
                        />
                    )}
                </div>
            )}
        </main>
    )
}
