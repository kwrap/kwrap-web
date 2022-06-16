import { ColorTheme } from './theme'

export const localData = {
    get server(): string | null {
        return localStorage.getItem('API_URL')
    },

    set server(value: string | null) {
        if (value === null) {
            localStorage.removeItem('API_URL')
        } else {
            localStorage.setItem('API_URL', value)
        }
    },

    get username(): string | null {
        return localStorage.getItem('USERNAME')
    },

    set username(value: string | null) {
        if (value === null) {
            localStorage.removeItem('USERNAME')
        } else {
            localStorage.setItem('USERNAME', value)
        }
    },

    get colorTheme(): ColorTheme {
        switch (localStorage.getItem('COLOR_THEME')) {
            case 'dark': {
                return ColorTheme.Dark
            }
            case 'light': {
                return ColorTheme.Light
            }
            default: {
                return ColorTheme.System
            }
        }
    },

    set colorTheme(value: ColorTheme) {
        switch (value) {
            case ColorTheme.Dark: {
                localStorage.setItem('COLOR_THEME', 'dark')
                break
            }
            case ColorTheme.Light: {
                localStorage.setItem('COLOR_THEME', 'light')
                break
            }
            default: {
                localStorage.removeItem('COLOR_THEME')
            }
        }
    }
}
