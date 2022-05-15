import styled from "styled-components"
import { useContext } from "react";
import UserContext from "./contexts/UserContext"


export default function Input(props) {
    const {userInfo, setUserInfo} = useContext(UserContext)
    const {type, id, placeholder, value} = props;
    return (
        <InputContainer >
            <input type = {type}
                placeholder = {placeholder} 
                id = {id} 
                value = {value}
                onChange = {(event)=>{
                    switch(id){
                        case "email":
                            setUserInfo({...userInfo, email: event.target.value})
                            
                            break
                            
                        
                        case "password":
                            setUserInfo({...userInfo, password: event.target.value})
                            break
                                                
                        case "name":
                            setUserInfo({...userInfo, name: event.target.value})
                            break

                        default:
                    }
                }}
                />
        </InputContainer>
    )
}

const InputContainer= styled.div`
    width: 90%;
    height: 60px;
    background-color: var(--white-color);
    border-radius: 5px;
    margin: auto;
    margin-bottom: 13px;
    

    input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 5px;
        color: #000;
        background-color: var(--white-color);
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
    }

    input:focus{
        outline: none;
    }

    input::-webkit-input-placeholder { /* Edge */
        padding-left: 11px;
        color: #000;
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        padding-left: 11px;
        color: #000;
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
    }

    input::placeholder {
        padding-left: 11px;
        color: #000;
        font-style: normal;
        font-weight: 400;
        line-height: 23px;
    }

`