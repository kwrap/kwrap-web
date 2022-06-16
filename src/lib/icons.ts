import iconsData from '../../kwrap-icons/icons.json'

export interface IconItem {
    name: string
    links: string[]
}

class Icons {
    icons: IconItem[] = []

    constructor() {
        this.icons = iconsData
    }

    public url(name?: string): string | undefined {
        name = name ?? ''
        let some = this.icons.some((item) => item.name == name)
        if (some) {
            return `./icons/${name}.png`
        }
    }
}

export const icons = new Icons()
