import { localData } from './local-data'

export enum ColorTheme {
    Light = 'Light',
    Dark = 'Dark',
    System = 'System'
}

export const autoUpdateColorTheme = () => {
    updateColorTheme()
    let medie = window.matchMedia('(prefers-color-scheme: dark)')
    medie.addEventListener('change', () => {
        updateColorTheme()
    })
}

export const updateColorTheme = () => {
    let html = document.querySelector('html')
    let meta = document.querySelector('meta[name="theme-color"]')

    switch (localData.colorTheme) {
        case ColorTheme.Light: {
            html?.classList.remove('dark')
            meta?.setAttribute('content', '#fff')
            break
        }
        case ColorTheme.Dark: {
            html?.classList.add('dark')
            meta?.setAttribute('content', '#000')
            break
        }
        case ColorTheme.System: {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                html?.classList.add('dark')
                meta?.setAttribute('content', '#000')
            } else {
                html?.classList.remove('dark')
                meta?.setAttribute('content', '#fff')
            }
        }
    }
}
