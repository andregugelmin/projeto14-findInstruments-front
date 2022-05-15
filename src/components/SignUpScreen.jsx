import styled from "styled-components"
import { useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


import Input from "./Input"
import UserContext from "./contexts/UserContext"
import logo from "./../assets/images/logoFindInstruments.svg"

export default function SignUpScreen() {
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {email, name, password} = userInfo;
    const navigate = useNavigate()

    function userSignUp() {
        const URL = `https://back-findinstruments.herokuapp.com/signUp`
        const signUpObject= {email, name, password};
        console.log(signUpObject);
        
        const request = axios.post(URL, signUpObject);

        request.then((response)=>{
            const signUpResponse = response.data;
            console.log(signUpResponse);
            navigate('/login');

        })
        request.catch((error)=>{
            const errorsArr = error.response.data;
            errorsArr.forEach((error)=>{
                alert(error.message);
            })
        })
    }

    return (
        <LoginPage>
            <LoginContainer>
                <LogoContainer><img src={logo} alt="Find Instruments Logo" /></LogoContainer>
                <h1>findInstruments</h1>
                    <Input type = {"email"} id = "email" placeholder = "email" />
                    <Input type = {"name"} id = "name" placeholder = "nome" />
                    <Input type = {"password"} id = "password" placeholder = "senha" />
                    <ButtonContainer>
                        <button onClick={()=>{
                            userSignUp();
                        }}>Cadastrar</button>
                    </ButtonContainer>
                    <Link to="/login">Já tem uma conta? Faça o Login</Link>
            </LoginContainer>
        </LoginPage>
    )
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
`

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

    a{
        width: fit-content;
        display: block;
        margin: 25px auto;
        color: var(--white-color);
        text-decoration: none;
    }
`


const LogoContainer = styled.div`
    width: 200px;
    margin: auto;
`

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
`