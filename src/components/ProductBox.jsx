import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';

import UserContext from './contexts/UserContext';

function ProductBox(props) {
    const { token } = useContext(UserContext);

    const [isAddingToCart, setisAddingToCart] = useState(false);

    const API_URL = 'https://back-findinstruments.herokuapp.com/cart';

    function addProductToCart() {
        setisAddingToCart(true);

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
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
            <div className="top-box">
                <div className="price-text">
                    <p className="dollar-sign">R$</p>
                    <p className="product-price">{props.price}</p>
                </div>

                {isAddingToCart ? (
                    <ion-icon name="cart-outline"></ion-icon>
                ) : (
                    <ion-icon
                        name="cart-outline"
                        onClick={addProductToCart}
                    ></ion-icon>
                )}
            </div>

            <img src={props.image} alt={props.name} />
            <p className="product-name">{props.name}</p>
        </Box>
    );
}

const Box = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #44413b;
    width: 160px;
    height: auto;
    min-height: 200px;
    border-radius: 10px;
    margin: 0 12px 25px 12px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);

    p {
        margin-bottom: 20px;
        margin-left: 10px;
    }
    .top-box {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }
    .price-text {
        display: flex;
        margin-top: 7px;
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

    ion-icon {
        font-size: 30px;
        margin-right: 10px;
    }

    img {
        width: 100%;
        max-height: 100px;
        height: auto;
    }

    .product-name {
        font-size: 16px;
        margin-top: 12px;
        color: #ffffff;
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
