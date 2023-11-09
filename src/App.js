import { Route, Routes } from 'react-router-dom';
import Print from './pages/Print.jsx';
import ChatWindow from './pages/ChatWindow.jsx';

const App = ({ iframeDomain, botApiId, primaryColor }) => {
    return (
        <Routes>
            <Route path='/' element={<ChatWindow iframeDomain={iframeDomain} botApiId={botApiId} primaryColor={primaryColor} />} />
            {/* <Route path='/print' element={<Print />} /> */}
        </Routes>
    )
}

export default App;