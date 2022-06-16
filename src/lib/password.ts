import { isValid, timestamp } from './utils'

export const DEFAULT_NAME = 'Untitled'

export interface EncryptedPassword {
    id: string
    data: string
}

export interface EncryptedPasswordData {
    data: string
}

export interface PasswordId {
    id: string
}

export interface Password {
    id: string
    data: PasswordData
}

export interface PasswordData {
    pin?: number
    icon?: string
    name?: string
    user?: string
    email?: string
    phone?: string
    password?: string
    otp?: string
    links?: string[]
    notes?: string
    custom?: CustomField[]
    tags?: string[]
    updated: number
    archive?: boolean
}

export interface CustomField {
    name: string
    value: string
    hidden: boolean
}

export type Tag = TagType | string
export enum TagType {
    All,
    Archive
}

export enum Sort {
    Default = 'Default',
    Name = 'Name',
    Update = 'Update time'
}

export const searchPassword = (data: PasswordData, val: string): boolean => {
    val = val.toLowerCase()
    let searchs = [
        data.name ?? DEFAULT_NAME,
        data.user,
        data.email,
        data.phone,
        data.notes,
        data.links,
        ...(data.custom ?? []).map((item) => [item.name, item.value]),
        data.tags
    ].flat()
    return searchs.some((item) => {
        if (item !== undefined) {
            return item.toLocaleLowerCase().includes(val)
        }
        return false
    })
}

export const emptyPassword = (): Password => {
    return {
        id: '',
        data: {
            updated: 0
        }
    }
}

export const trimPasswordData = (data: PasswordData | PasswordData[]) => {
    if (Array.isArray(data)) {
        for (let pw of data) {
            trimPasswordData(pw)
        }
    } else {
        for (let key in data) {
            if (!isValid(data[key as keyof PasswordData])) {
                delete data[key as keyof PasswordData]
            }
        }
    }
}

export const sortPasswords = (passwords: Password[], sort: Sort, pin: boolean) => {
    passwords.sort((a, b) => {
        switch (sort) {
            case Sort.Default:
                if (pin) {
                    return (b.data.pin || 0) - (a.data.pin || 0)
                } else {
                    return 1
                }
            case Sort.Name:
                return (a.data.name || DEFAULT_NAME).localeCompare(b.data.name || DEFAULT_NAME)
            case Sort.Update:
                return b.data.updated - a.data.updated
        }
    })
}

export const splitPasswords = (passwords: Password[]): [Array<Password>, Array<Password>] => {
    let [pins, unpins]: [Array<Password>, Array<Password>] = [[], []]
    for (let item of passwords) {
        if (item.data.pin !== undefined) {
            pins.push(item)
        } else {
            unpins.push(item)
        }
    }
    return [pins, unpins]
}
