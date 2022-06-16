import { React, CustomField } from '../lib'
import { IconPlus } from './common/icons'
import { Checkbox } from './common/checkbox'
import { Chunk, ChunkGroup } from './common/chunk'
import { Button } from './common/button'

interface Props {
    data: CustomField[]
    onChange(custom: CustomField[]): void
}

export const DetailEditCustom = ({ data, onChange }: Props) => {
    return (
        <>
            {data.map((item, i) => {
                return (
                    <ChunkGroup key={i}>
                        <Chunk
                            centerChildren={
                                <input
                                    className='input'
                                    type='text'
                                    placeholder='Name'
                                    value={item.name}
                                    onChange={(e) => {
                                        let d = data.map((item) => ({ ...item }))
                                        d[i].name = e.target.value
                                        onChange(d)
                                    }}
                                />
                            }
                            onClear={
                                data[i].name === ''
                                    ? undefined
                                    : () => {
                                          let d = data.map((item) => ({ ...item }))
                                          d[i].name = ''
                                          onChange([...d])
                                      }
                            }
                            onRemove={() => {
                                onChange(data.filter((_, n) => n !== i))
                            }}
                            bottomChildren={
                                <>
                                    <textarea
                                        className='input h-20'
                                        placeholder='Content'
                                        value={item.value}
                                        onChange={(e) => {
                                            let d = data.map((item) => ({ ...item }))
                                            d[i].value = e.target.value
                                            onChange([...d])
                                        }}
                                    />
                                    <Checkbox
                                        label='Hidden content'
                                        checked={item.hidden}
                                        onChange={(hidden) => {
                                            let d = data.map((item) => ({ ...item }))
                                            d[i].hidden = hidden
                                            onChange([...d])
                                        }}
                                    />
                                </>
                            }
                        />
                    </ChunkGroup>
                )
            })}
            <Button
                className='gap-2 rounded-lg bg-[#F1F1F5] mb-4 w-full h-10 dark:text-gray-200 dark:bg-dark-light'
                onClick={() => {
                    onChange([...data, { name: '', value: '', hidden: false }])
                }}
            >
                <IconPlus className='w-5 h-5' />
                Add custom field
            </Button>
        </>
    )
}
