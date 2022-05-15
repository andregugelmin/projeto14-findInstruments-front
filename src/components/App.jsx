import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import GlobalCSSConfig from './GlobalCSSConfig';
import ProductsScreen from './ProductsScreen';
import CartScreen from './CartScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

function App() {
    const [token, setToken] = useState('admin');
    const [userInfo, setUserInfo] = useState({email:"", name:"", password:""})


    return (
        <>
            <GlobalCSSConfig />
            <UserContext.Provider value={{ token, setToken, userInfo, setUserInfo }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<ProductsScreen />} />
                        <Route path="/signup" element = {<SignUpScreen />} />
                        <Route path="/login" element = {<LoginScreen />} />
                        <Route path="/cart" element={<CartScreen />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}

export default App;
