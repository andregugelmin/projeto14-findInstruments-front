import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';

import UserContext from './contexts/UserContext';
import ProductBox from './ProductBox';
import Menu from './Menu';

function CartScreen() {
    const API_URL = 'https://back-findinstruments.herokuapp.com/cart';
    const { token } = useContext(UserContext);

    const [products, setProducts] = useState([]);

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const promise = axios.get(API_URL, config);

    useEffect(() => {
        promise.then((response) => {
            const { data } = response;
            console.log(response);
            setProducts(data.products);
        });
        promise.catch((err) => {
            console.log(err.response.data.message);
        });
    }, []);

    return (
        <>
            <CartProducts>
                {products.map((product, index) => {
                    return (
                        <ProductBox
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            key={index}
                        />
                    );
                })}
            </CartProducts>
            <Menu screen={'cart'} />
        </>
    );
}

const CartProducts = styled.div`
    @media (min-width: 800px) {
    }
`;

export default CartScreen;
