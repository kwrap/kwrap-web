import { utils, useState, React, useRecoilState, PasswordData } from '../lib'
import { Tags } from './common/tags'
import { Button } from './common/button'
import { PopupPassword } from './popup-password'
import { DetailEditCustom } from './password-edit-custom'
import {
    IconPlus,
    IconEdit,
    IconNotes,
    IconUser,
    IconLock,
    IconLink,
    IconPhone,
    IconEmail,
    IconKey
} from './common/icons'
import { Chunk, ChunkGroup } from './common/chunk'
import { EDIT_DATA } from '../state'

const isValid = utils.isValid

export const DetailEdit = () => {
    const [data, setData] = useRecoilState(EDIT_DATA)
    const [showPassword, setShowPassword] = useState(false)
    const [showCreatePassword, setShowCreatePassword] = useState(false)
    const [tagValue, setTagValue] = useState('')
    const values = data.data

    const onChange = (op: Partial<PasswordData>) => {
        setData({
            id: data.id,
            data: {
                ...data.data,
                ...op
            }
        })
    }

    return (
        <>
            <ChunkGroup>
                <Chunk
                    icon={IconEdit}
                    centerChildren={
                        <input
                            className='input'
                            type='text'
                            placeholder='Name'
                            value={values.name || ''}
                            onChange={(e) => onChange({ name: e.target.value })}
                        />
                    }
                    onClear={!isValid(values.name) ? undefined : () => onChange({ name: '' })}
                />
            </ChunkGroup>

            <ChunkGroup>
                <Chunk
                    icon={IconUser}
                    centerChildren={
                        <input
                            className='input'
                            type='text'
                            placeholder='Username'
                            value={values.user || ''}
                            onChange={(e) => {
                                onChange({ user: e.target.value })
                            }}
                        />
                    }
                    onClear={!isValid(values.user) ? undefined : () => onChange({ user: '' })}
                />
                <Chunk
                    icon={IconEmail}
                    centerChildren={
                        <input
                            className='input'
                            type='text'
                            placeholder='example@mail.com'
                            value={values.email || ''}
                            onChange={(e) => {
                                onChange({ email: e.target.value })
                            }}
                        />
                    }
                    onClear={!isValid(values.email) ? undefined : () => onChange({ email: '' })}
                />
                <Chunk
                    icon={IconPhone}
                    centerChildren={
                        <input
                            className='input'
                            type='text'
                            placeholder='Phone'
                            value={values.phone || ''}
                            onChange={(e) => {
                                onChange({ phone: e.target.value })
                            }}
                        />
                    }
                    onClear={!isValid(values.phone) ? undefined : () => onChange({ phone: '' })}
                />
                <Chunk
                    icon={IconLock}
                    centerChildren={
                        <input
                            className='input'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='Password'
                            value={values.password || ''}
                            onChange={(e) => {
                                onChange({ password: e.target.value })
                            }}
                        />
                    }
                    onClear={
                        !isValid(values.password) ? undefined : () => onChange({ password: '' })
                    }
                    copyText={values.password || ''}
                    show={showPassword}
                    onChangeShow={(show) => setShowPassword(show)}
                    onRefresh={() => setShowCreatePassword(true)}
                />
                {showCreatePassword && (
                    <PopupPassword
                        onComplete={(password) => {
                            setShowCreatePassword(false)
                            if (password !== undefined) {
                                onChange({ password })
                            }
                        }}
                    />
                )}
                <Chunk
                    icon={IconKey}
                    centerChildren={
                        <input
                            className='input'
                            type='text'
                            placeholder='One-time password'
                            value={values.otp || ''}
                            onChange={(e) => {
                                onChange({ otp: e.target.value })
                            }}
                        />
                    }
                    onClear={!isValid(values.otp) ? undefined : () => onChange({ otp: '' })}
                />
            </ChunkGroup>

            <ChunkGroup>
                {(values.links || ['']).map((link, i) => {
                    return (
                        <Chunk
                            key={i}
                            icon={IconLink}
                            centerChildren={
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='https://example.com'
                                    value={link}
                                    onChange={(e) => {
                                        let links = [...(values.links || '')]
                                        links[i] = e.target.value
                                        onChange({ links })
                                    }}
                                />
                            }
                            onClear={
                                link === ''
                                    ? undefined
                                    : () => {
                                          ;(values.links || [])[i] = ''
                                          onChange({ links: values.links })
                                      }
                            }
                            onRemove={() => {
                                onChange({
                                    links: (values.links || []).filter((_, n) => i !== n)
                                })
                            }}
                        />
                    )
                })}
            </ChunkGroup>

            <Button
                className='gap-2 rounded-lg bg-[#F1F1F5] w-full h-10 mb-4 dark:text-gray-200 dark:bg-dark-light'
                onClick={() => {
                    onChange({ links: [...(values.links || ['']), ''] })
                }}
            >
                <IconPlus className='w-5 h-5' />
                Add link
            </Button>

            <ChunkGroup>
                <Chunk
                    icon={IconNotes}
                    onClear={
                        !isValid(values.notes)
                            ? undefined
                            : () => {
                                  onChange({ notes: '' })
                              }
                    }
                    bottomChildren={
                        <textarea
                            className='input h-20'
                            placeholder='Notes'
                            value={values.notes || ''}
                            onChange={(e) => {
                                onChange({ notes: e.target.value })
                            }}
                        />
                    }
                />
            </ChunkGroup>

            <DetailEditCustom
                data={values.custom || []}
                onChange={(custom) =>
                    onChange({
                        custom
                    })
                }
            />

            <ChunkGroup>
                <Tags
                    tags={values.tags || []}
                    onDelete={(tagName) => {
                        onChange({
                            tags: values.tags?.filter((item) => item !== tagName)
                        })
                    }}
                />
                <input
                    className='input h-9 px-3 mb-3'
                    type='text'
                    placeholder='Tag'
                    value={tagValue}
                    onChange={(e) => {
                        let value = e.target.value
                        setTagValue(value)
                        if (value.includes(' ')) {
                            setTagValue('')
                            onChange({
                                tags: Array.from(
                                    new Set([
                                        ...(values.tags || []),
                                        ...value
                                            .trim()
                                            .split(' ')
                                            .filter((item) => item.length !== 0)
                                    ])
                                )
                            })
                        }
                    }}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            let tags = values.tags || []
                            setTagValue('')
                            if (!tags.includes(tagValue)) {
                                onChange({ tags: [...tags, tagValue] })
                            }
                        }
                    }}
                />
            </ChunkGroup>
        </>
    )
}
