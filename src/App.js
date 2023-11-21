import { Route, Routes } from 'react-router-dom';
import Print from './pages/Print.jsx';
import ChatWindow from './pages/ChatWindow.jsx';
import TagManager from 'react-gtm-module';

const gtmID = process.env.REACT_APP_GTM_ID;

const tagManagerArgs = {
    gtmId: gtmID
}

TagManager.initialize(tagManagerArgs);

const App = ({ iframeDomain, botApiId, primaryColor }) => {
    return (
        <Routes>
            <Route path='/' element={<ChatWindow iframeDomain={iframeDomain} botApiId={botApiId} primaryColor={primaryColor} />} />
            {/* <Route path='/print' element={<Print />} /> */}
        </Routes>
    )
}

export default App;