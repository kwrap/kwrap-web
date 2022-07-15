import * as fs from 'fs'
import { resolve } from 'path'
import { UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

const copyDir = (src: string, dest: string) => {
    let exist = fs.existsSync(dest)
    if (!exist) {
        fs.mkdirSync(dest)
    }
    for (let file of fs.readdirSync(src)) {
        fs.copyFileSync(`${src}/${file}`, `${dest}/${file}`)
    }
}

// Copy kwrap-icons to public dir
copyDir('./kwrap-icons/icons/', './src/public/icons/')

export default (): UserConfig => {
    return {
        server: {
            host: true,
            port: 1234
        },
        base: './',
        root: './src/',
        build: {
            outDir: '../dist/',
            assetsInlineLimit: 0,
            emptyOutDir: true,
            target: 'esnext',
            rollupOptions: {
                input: {
                    index: resolve(__dirname, './src/index.html')
                }
            }
        },
        plugins: [react(), createHtmlPlugin()]
    }
}
