import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext } from 'react';

import UserContext from './contexts/UserContext';

function ProductBox(props) {
    const { userInfo } = useContext(UserContext);

    const [isAddingToCart, setisAddingToCart] = useState(false);

    const API_URL = 'https://back-findinstruments.herokuapp.com/cart';

    function addProductToCart() {
        if (!userInfo.token) {
            alert('Please login to your account');
            return;
        }
        setisAddingToCart(true);

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const productInfo = {
            name: props.name,
            price: props.price,
            image: props.image,
        };
        const promise = axios.post(API_URL, productInfo, config);

        promise.then((response) => {
            setisAddingToCart(false);
            alert(productInfo.name + ' adcionado ao carrinho');
        });
        promise.catch((err) => {
            alert(err.response.data.message);
            setisAddingToCart(false);
        });
    }

    return (
        <Box>
            {isAddingToCart ? (
                <ion-icon name="cart-outline"></ion-icon>
            ) : (
                <ion-icon
                    name="cart-outline"
                    onClick={addProductToCart}
                ></ion-icon>
            )}

            <div className="img-container">
                <img src={props.image} alt={props.name} />
            </div>
            <div className="stars"></div>
            <h2>{props.name}</h2>
            <p>R$ {props.price.replace('.', ',')}</p>
        </Box>
    );
}

const Box = styled.div`
    width: calc(50% - 10px);
    height: 214px;
    max-width: 200px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    -webkit-box-shadow: 1px -2px 5px 1px rgba(0, 0, 0, 0.4);
    box-shadow: 1px -2px 5px 1px rgba(0, 0, 0, 0.4);
    padding: 5px;
    border-radius: 8px;

    .img-container {
        width: 100%;
        max-height: 112px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 100%;
        max-height: 112px;
        margin-bottom: 3px;
    }

    h2,
    p {
        margin-top: 4px;
    }

    p {
        display: block;
        position: relative;
        margin-top: 15px;
        font-weight: bold;
    }

    ion-icon {
        position: absolute;
        top: 5px;
        right: 5px;
        font-size: 20px;
    }

    @media (min-width: 600px) {
        width: 200px;
        min-height: 260px;
        margin: 0 20px 40px 20px;
        img {
            width: 100%;
            max-height: 130px;
            height: auto;
        }
    }

    @media (min-width: 800px) {
        width: 260px;
        min-height: 320px;
        margin: 0 24px 50px 24px;
        img {
            width: 100%;
            max-height: 160px;
            height: auto;
        }
    }
`;

export default ProductBox;
