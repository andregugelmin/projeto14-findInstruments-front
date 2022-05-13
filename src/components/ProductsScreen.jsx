import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import ProductBox from './ProductBox';
import Menu from './Menu';

function ProductsScreen() {
    const API_URL = 'https://back-findinstruments.herokuapp.com/products';
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
            <Products>
                <header>findInstruments</header>
                <main>
                    <div className="products">
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
                    </div>
                </main>
            </Products>
            <Menu screen={'products'} />
        </>
    );
}

const Products = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 100px;
    header {
        font-size: 36px;
        margin-top: 40px;
        margin-bottom: 40px;
        font-family: 'Elsie';
        font-weight: 900;
        color: #dbac3e;
    }

    .products {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    @media (min-width: 800px) {
        padding-left: 170px;
    }
`;

export default ProductsScreen;
