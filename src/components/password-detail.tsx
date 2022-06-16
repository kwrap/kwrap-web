import {
    Password,
    utils,
    React,
    useEffect,
    useState,
    useRecoilState,
    useSetRecoilState,
    http
} from '../lib'
import { PASSWORDS, PREVIEW_DATA, EDIT_DATA, DETAIL_PAGE, DetailPage } from '../state'
import { Button } from './common/button'
import { DetailPreview } from './password-preview'
import { DetailEdit } from './password-edit'
import { IconLeft } from './common/icons'
import { PopupIcons } from './popup-icons'

interface Props {
    onClose(): void
    onChangeSelect(id: string): void
}

export const Detail = ({ onClose, onChangeSelect }: Props) => {
    const setPasswords = useSetRecoilState(PASSWORDS)
    const [preview, setPreview] = useRecoilState(PREVIEW_DATA)
    const [edit, setEdit] = useRecoilState(EDIT_DATA)
    const [detail, setDetail] = useRecoilState(DETAIL_PAGE)
    const [showPopupIcon, setShowPopupIcon] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)

    useEffect(() => {
        setDeleteLoading(false)
        setSaveLoading(false)
    }, [preview.id, detail])

    const onDelete = () => {
        setDeleteLoading(true)
        http.deletePassword(edit.id).then(() => {
            setDetail(DetailPage.None)
            setPasswords((items) => items.filter((item) => item.id !== edit.id))
        })
    }

    const onSavePassword = async (pw: Password, timestamp: boolean) => {
        setSaveLoading(true)
        if (timestamp) {
            pw.data.updated = utils.timestamp()
        }

        if (pw.id === '') {
            // Create
            http.createPassword(pw.data)
                .finally(() => setSaveLoading(false))
                .then((id) => {
                    let p = {
                        id,
                        data: pw.data
                    }
                    setPreview(p)
                    setDetail(DetailPage.Preview)
                    onChangeSelect(id)
                    setPasswords((items) => {
                        let i = items.findIndex((item) => item.id === id) as number
                        if (i >= 0) {
                            let list = [...items]
                            list[i] = p
                            return list
                        } else {
                            return [...items, p]
                        }
                    })
                })
        } else {
            http.updatePassword(pw.id, pw.data)
                .finally(() => setSaveLoading(false))
                .then(() => {
                    setPreview(pw)
                    setDetail(DetailPage.Preview)
                    setPasswords((items) => {
                        let i = items.findIndex((item) => item.id === pw.id) as number
                        let list = [...items]
                        list[i] = pw
                        return list
                    })
                })
        }
    }

    return (
        <div className='fixed inset-0 z-20 flex-1 w-full bg-white dark:bg-black sm:pt-4 px-4 sm:px-1 pb-12 sm:pb-6 overscroll-y-contain overflow-y-auto sm:relative animate-alert sm:animate-none'>
            <div className='h-12 flex items-center sm:hidden'>
                <IconLeft className='h-5 w-5 dark:text-gray-100' onClick={() => onClose()} />
            </div>

            {detail === DetailPage.Preview ? (
                <DetailPreview
                    onClickEdit={() => {
                        setEdit({ ...preview })
                        setDetail(DetailPage.Edit)
                    }}
                    onClickPin={() => {
                        onSavePassword(
                            {
                                id: preview.id,
                                data: {
                                    ...preview.data,
                                    pin: preview.data.pin ? undefined : utils.timestamp()
                                }
                            },
                            false
                        )
                    }}
                    onClickArchive={() => {
                        let archive = preview.data.archive ? false : true
                        onSavePassword(
                            { id: preview.id, data: { ...preview.data, archive } },
                            false
                        )
                    }}
                    onClickIcon={() => {
                        setShowPopupIcon(true)
                    }}
                />
            ) : (
                <DetailEdit />
            )}

            {showPopupIcon && (
                <PopupIcons
                    onCancel={() => setShowPopupIcon(false)}
                    onSelect={(icon) => {
                        setShowPopupIcon(false)
                        onSavePassword({ id: preview.id, data: { ...preview.data, icon } }, true)
                    }}
                />
            )}

            {detail === DetailPage.Edit && (
                <div className='flex gap-5 mt-5'>
                    {edit.id !== '' && (
                        <Button
                            className='flex-1 h-10 rounded-lg border border-red-600 text-red-600'
                            disabled={deleteLoading}
                            onClick={onDelete}
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        className='flex-1 h-10 rounded-lg bg-theme text-white'
                        disabled={saveLoading}
                        onClick={() => {
                            onSavePassword({ id: edit.id, data: { ...edit.data } }, true)
                        }}
                    >
                        Save
                    </Button>
                </div>
            )}
        </div>
    )
}
