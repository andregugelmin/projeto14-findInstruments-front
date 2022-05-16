import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';

import UserContext from './contexts/UserContext';
import useWindowDimensions from './Hooks/windowsDimensions';

function CartProductBox(props) {
    const { userInfo } = useContext(UserContext);
    const { height, width } = useWindowDimensions();

    const [isClicked, setIsClicked] = useState(false);

    const API_URL = `https://back-findinstruments.herokuapp.com/cart/${props.id}`;

    function toggleClick() {
        setIsClicked(!isClicked);
    }

    function removeItemFromCart() {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const promise = axios.delete(API_URL, config);
        promise.then((response) => {
            console.log(response);
            props.reloadProducts();
        });
        promise.catch((err) => {
            console.log(err.response.data.message);
        });
    }

    return (
        <Container>
            <div className="box" onClick={toggleClick}>
                <div className="top-box">
                    <p className="product-name">{props.name}</p>
                    <div className="price-box">
                        <p className="dollar-sign">R$</p>
                        <p className="product-price">
                            {props.price.replace('.', ',')}
                        </p>
                    </div>
                </div>
                {width < 400 ? (
                    <></>
                ) : (
                    <img src={props.image} alt={props.name} />
                )}
            </div>
            {isClicked ? (
                <div className="icon-box" onClick={removeItemFromCart}>
                    <ion-icon name="trash-bin-outline"></ion-icon>
                </div>
            ) : (
                <></>
            )}
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    height: 80px;
    width: 100%;
    margin-bottom: 25px;

    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #44413b;
        border-radius: 10px;
        width: 100%;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);
        padding-left: 20px;
        padding-right: 20px;
    }

    .price-box {
        display: flex;
    }

    .dollar-sign {
        text-shadow: 0 0 3px #dbae44;
        color: #e4ba57;
    }
    .product-price {
        color: #ffffff;
        font-weight: 500;
        margin-left: 3px;
    }

    .product-name {
        font-size: 18px;
        color: #ffffff;
    }

    img {
        max-height: 70px;
        width: auto;
        margin-left: 3px;
    }
    .top-box {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 100%;
    }

    .icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
    }

    ion-icon {
        font-size: 30px;
    }
    @media (min-width: 600px) {
    }

    @media (min-width: 800px) {
    }
`;

export default CartProductBox;
