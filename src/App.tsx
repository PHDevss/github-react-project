import Ways from './routes'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/global'

const App = () => (
    <>
        <BrowserRouter basename='/github-react-project/'>
            <Ways />
        </BrowserRouter>
        <GlobalStyle />
    </>
)

export default App;
