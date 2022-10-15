import Ways from './routes'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/global'

const App = () => (
    <>
        <BrowserRouter>
            <Ways />
        </BrowserRouter>
        <GlobalStyle />
    </>
)

export default App;
