// Generate random password

export interface GenerateOption {
    length: number
    includeLowercase: boolean
    includeUppercase: boolean
    includeNumbers: boolean
    includeSymbols: boolean
}

export const DEFAULT_OPTION: GenerateOption = {
    length: 32,
    includeLowercase: true,
    includeUppercase: true,
    includeNumbers: true,
    includeSymbols: true
}

export function passwordGenerate(options: GenerateOption): string {
    const lowersChars = 'abcdefghijklmnopqrstuvwxyz'
    const uppersChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbersChars = '0123456789'
    const symbolsChars = '!@#$%^&*()_+-=[]{}|;:,./<>?'

    let [password, chars] = ['', '']
    let optionsCount = [
        options.includeLowercase,
        options.includeUppercase,
        options.includeNumbers,
        options.includeSymbols
    ].filter(Boolean).length

    // Error
    if (optionsCount == 0 || optionsCount > options.length) {
        return ''
    }

    if (options.includeLowercase) {
        password += randChars(lowersChars)
        chars += lowersChars
    }
    if (options.includeUppercase) {
        password += randChars(uppersChars)
        chars += uppersChars
    }
    if (options.includeNumbers) {
        password += randChars(numbersChars)
        chars += numbersChars
    }
    if (options.includeSymbols) {
        password += randChars(symbolsChars)
        chars += symbolsChars
    }

    for (let i = optionsCount; i < options.length; i++) {
        password += randChars(chars)
    }
    return shuffle(password)
}

function randChars(chars: string): string {
    let n = Math.floor(Math.random() * chars.length)
    return chars.charAt(n)
}

function shuffle(str: string): string {
    let arr = Array.from(str)
    for (let i = arr.length - 1; i > 0; i--) {
        let n = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[n]] = [arr[n], arr[i]]
    }
    return arr.join('')
}
