import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import ProductBox from './ProductBox';
import Header from './Header';

function ProductsScreen() {
    const API_URL = 'https://back-findinstruments.herokuapp.com/products';
    const [products, setProducts] = useState([]);
    const { userInfo } = useContext(UserContext);

    const promise = axios.get(API_URL);

    const navigate = useNavigate();

    const localUserObj = localStorage.getItem('findInstrumentsUserData');

    if (localUserObj && !userInfo.token) {
        navigate('/login');
    }

    useEffect(() => {
        promise.then((response) => {
            const { data } = response;
            setProducts(data.products);
        });
        promise.catch((err) => {
            console.log(err.response.data.message);
        });
    }, []);

    return (
        <ProductPage>
            <Header></Header>
            <ProductsArea>
                {products.map((product, index) => {
                    return (
                        <ProductBox
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            stars={product.stars}
                            key={index}
                        />
                    );
                })}
            </ProductsArea>
        </ProductPage>
    );
}

const ProductPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProductsArea = styled.main`
    width: 95%;
    height: fit-content;
    overflow-y: scroll;
    margin: 170px auto auto 10px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px 0px;

    .product-container {
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
    }

    .product-container .img-container {
        width: 100%;
        height: 112px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .product-container img {
        width: 100%;
        margin-bottom: 3px;
    }

    .product-container h2,
    .product-container p {
        margin-top: 4px;
    }

    .product-container p {
        display: block;
        position: relative;
        margin-top: 15px;
        font-weight: bold;
    }
`;

export default ProductsScreen;
//     return (
//         <>
//             <Products>
//                 <header>

//                 </header>
//                 <main>
//                     <div className="products">
//                         {products.map((product, index) => {
//                             return (
//                                 <ProductBox
//                                     image={product.image}
//                                     name={product.name}
//                                     price={product.price}
//                                     key={index}
//                                 />
//                             );
//                         })}
//                     </div>
//                 </main>
//             </Products>
//             <Menu screen={'products'} />
//         </>
//     );
// }

// const Products = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;

//     margin-bottom: 100px;
//     header {
//         font-size: 36px;
//         margin-top: 40px;
//         margin-bottom: 40px;
//         font-family: 'Elsie';
//         font-weight: 900;
//         color: #dbac3e;
//         background-color: red;
//     }

//     .products {
//         display: flex;
//         flex-wrap: wrap;
//         margin-left: 20px;
//     }

//     @media (min-width: 800px) {
//         padding-left: 170px;
//         margin-left: 40px;
//     }
// `;
