import * as total from '../components/common/toast'

export const timestamp = (): number => {
    return Math.floor(Date.now() / 1000)
}

export const timeFromNow = (timestamp: number) => {
    let seconds = Math.floor(new Date().getTime() / 1000 - timestamp)
    let interval = seconds / 31536000
    if (interval >= 1) {
        return Math.floor(interval) + ' years ago'
    }
    interval = seconds / 2592000
    if (interval >= 1) {
        return Math.floor(interval) + ' months ago'
    }
    interval = seconds / 86400
    if (interval >= 1) {
        return Math.floor(interval) + ' days ago'
    }
    interval = seconds / 3600
    if (interval >= 1) {
        return Math.floor(interval) + ' hours ago'
    }
    interval = seconds / 60
    if (interval >= 1) {
        return Math.floor(interval) + ' minutes ago'
    }
    return Math.floor(seconds) + ' seconds ago'
}

export const copyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
        total.success('Copied!')
    })
}

export const isValid = (value: any): boolean => {
    if (value === null || value === undefined) {
        return false
    }
    if (typeof value === 'string' && value.length === 0) {
        return false
    }
    if (Array.isArray(value) && value.length === 0) {
        return false
    }
    return true
}

export const verifyURL = (s: string): boolean => {
    try {
        let url = new URL(s)
        if (url.protocol === 'http:' || url.protocol === 'https:') {
            return true
        }
    } catch (_) {}
    return false
}
