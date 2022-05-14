import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';

import UserContext from './contexts/UserContext';
import Menu from './Menu';
import CartProductBox from './CartProductBox';

function CartScreen() {
    const API_URL = 'https://back-findinstruments.herokuapp.com/cart';
    const { token } = useContext(UserContext);

    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const promise = axios.get(API_URL, config);
        promise.then((response) => {
            const { data } = response;
            console.log(response);
            setProducts(data.products);
            calcTotalPrice();
        });
        promise.catch((err) => {
            console.log(err.response.data.message);
        });
    }, []);

    useEffect(() => {
        calcTotalPrice();
    }, [products]);

    function reloadProducts() {
        const promise = axios.get(API_URL, config);

        promise.then((response) => {
            const { data } = response;
            console.log(response);
            setProducts(data.products);
        });
        promise.catch((err) => {
            console.log(err.response.data.message);
        });
    }

    function calcTotalPrice() {
        let price = 0;
        products.forEach((product) => (price += parseFloat(product.price)));
        setTotalPrice(price);
    }

    return (
        <>
            <CartProducts>
                <main>
                    {products.map((product, index) => {
                        return (
                            <CartProductBox
                                image={product.image}
                                name={product.name}
                                price={product.price}
                                id={product._id}
                                key={index}
                                reloadProducts={reloadProducts}
                            />
                        );
                    })}

                    <h2>Total Price: R$ {totalPrice}</h2>
                </main>
            </CartProducts>
            <Menu screen={'cart'} />
        </>
    );
}

const CartProducts = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 100px;
    padding-right: 30px;
    padding-left: 30px;
    width: 100%;
    main {
        display: flex;
        flex-direction: column;
        margin-top: 200px;
        width: 100%;
        max-width: 700px;
    }

    @media (min-width: 800px) {
        padding-left: 220px;
        padding-right: 50px;
    }
`;

export default CartScreen;
