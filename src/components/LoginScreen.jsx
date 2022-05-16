import styled from 'styled-components';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import Input from './Input';
import UserContext from './contexts/UserContext';
import logo from './../assets/images/logoFindInstruments.svg';

export default function LoginScreen() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    let { email, password } = userInfo;
    const [isLoading, setIsLoading] = useState(true);
    const [isLogingIn, setIsLogingIn] = useState(true);
    const navigate = useNavigate();

    const localUserObj = localStorage.getItem('findInstrumentsUserData');

    if (localUserObj) {
        const userObjDeserialized = JSON.parse(localUserObj);
        email = userObjDeserialized.email;
        password = userObjDeserialized.password;
        userLogin();
    } else if (isLoading) {
        setIsLoading(false);
        setIsLogingIn(false);
    }

    function userLogin() {
        const URL = `https://back-findinstruments.herokuapp.com/login`;
        const loginObject = { email, password };

        const request = axios.post(URL, loginObject);

        request.then((response) => {
            const loginResponse = response.data;
            saveUserObjLocally(loginObject);
            setUserInfo(loginResponse);
            navigate('/');
        });
        request.catch((error) => {
            const errorsArr = error.response.data;
            errorsArr.forEach((error) => {
                alert(error.message);
            });
            setIsLogingIn(false);
        });
    }

    function saveUserObjLocally(userObj) {
        const userObjSerialized = JSON.stringify(userObj);
        localStorage.setItem('findInstrumentsUserData', userObjSerialized);
    }

    return !isLogingIn ? (
        <LoginPage>
            <LoginContainer>
                <LogoContainer>
                    <img src={logo} alt="Find Instruments Logo" />
                </LogoContainer>
                <h1>findInstruments</h1>
                <Input type={'email'} id="email" placeholder="email" />
                <Input type={'password'} id="password" placeholder="senha" />
                <ButtonContainer>
                    <button
                        onClick={() => {
                            userLogin();
                        }}
                    >
                        Entrar
                    </button>
                </ButtonContainer>
                <Link to="/signup">Primeira vez? Cadastre-se</Link>
            </LoginContainer>
        </LoginPage>
    ) : (
        <LoginPage>
            <LogoContainer>
                <img src={logo} alt="Find Instruments Logo" />
            </LogoContainer>
        </LoginPage>
    );
}

const LoginPage = styled.section`
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
    margin: auto;
    background-color: var(--black-color);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const LoginContainer = styled.div`
    width: 100%;
    max-width: 400px;
    margin: auto;

    h1 {
        font-family: 'Lobster', cursive;
        font-style: normal;
        font-weight: 400;
        font-size: 32px;
        line-height: 50px;
        color: var(--white-color);
        text-align: center;
        margin-bottom: 24px;
    }

    a {
        width: fit-content;
        display: block;
        margin: 25px auto;
        color: var(--white-color);
        text-decoration: none;
    }
`;

const LogoContainer = styled.div`
    width: 200px;
    margin: auto;
`;

const ButtonContainer = styled.div`
    width: 90%;
    height: 60px;
    background-color: var(--button-color);
    border-radius: 5px;
    margin: auto;
    margin-bottom: 13px;

    button {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        color: var(--black-color);
        font-weight: 700;
    }
`;
