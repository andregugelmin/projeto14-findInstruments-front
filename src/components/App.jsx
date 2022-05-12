import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import GlobalCSSConfig from './GlobalCSSConfig';
import ProductsScreen from './ProductsScreen';

function App() {
    const [token, setToken] = useState('admin');

    return (
        <>
            <GlobalCSSConfig />
            <UserContext.Provider value={{ token, setToken }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/products" element={<ProductsScreen />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
