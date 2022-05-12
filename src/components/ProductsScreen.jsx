import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';

function ProductsScreen() {
    const API_URL = 'http://localhost:5500/products';
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
            <h1>findInstruments</h1>
            {products.map((product, index) => {
                return (
                    <img src={product.image} alt={product.name} key={index} />
                );
            })}
        </>
    );
}

export default ProductsScreen;
