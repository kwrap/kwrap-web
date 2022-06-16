import { createRoot, RecoilRoot, autoUpdateColorTheme, React } from './lib'
import { Main } from './components/main'

autoUpdateColorTheme() // dark

const root = createRoot(document.querySelector('#root') as Element)
root.render(
    <React.StrictMode>
        <RecoilRoot>
            <Main />
        </RecoilRoot>
    </React.StrictMode>
)
