import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { Link } from "react-router-dom";

import UserContext from './contexts/UserContext';
import ProductBox from './ProductBox';
import Menu from './Menu';
import logo from "./../assets/images/logoFindInstruments.svg";
import bannerImg from "./../assets/images/bannerImg.webp";


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
            setProducts(data.products);
        });
        promise.catch((err) => {
            console.log(err.response.data.message);
        });
    }, []);

    return(
        <ProductPage>
            <header>
                <div className="left-side">
                    <ion-icon name="menu-outline"></ion-icon>
                    <ion-icon name="search-outline"></ion-icon>
                </div>
                <img src={logo} alt="Find Instruments Logo" />
                <div className="right-side">
                    <ion-icon name="person"></ion-icon>
                    <Link to = "/cart">
                        <ion-icon name="cart"></ion-icon>
                    </Link>
                </div>
            </header>
            <Banner img = {bannerImg} color = {'blue'} >
                <div className="backdrop"></div>
            </Banner>

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
    )


}

const ProductPage = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    header {
        width: 95%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: 2;
        background-color: #0000006e;

    }

    header .left-side,
    header .right-side {
        display: flex;
    }


    header img {
        width: 100px;
    }

    header .left-side ion-icon ,
    header .right-side ion-icon {
        color: #fff;
        font-size: 24px;
        margin-right: 7px;
    }

    header .right-side ion-icon:last-child {
        margin-right: 0;
    }
`

const Banner = styled.div`
    width: 100%;
    height: 150px;
    background-image: url(${props=>props.img});
    background-position: center;
    background-size: cover;
    position: absolute;

    .backdrop {
        width: 50%;
        height: 150px;
        background-color: #000000b7;
        position: absolute;
        z-index: 1;
    }

    p {
        color: #fff;
        display: block;
        position: relative;
        z-index: 1;
        bottom: 0px;
    }

`

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
        -webkit-box-shadow: 1px -2px 5px 1px rgba(0,0,0,0.4); 
        box-shadow: 1px -2px 5px 1px rgba(0,0,0,0.4);
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

    .product-container p  {
        display: block;
        position: relative;
        margin-top: 15px;
        font-weight: bold;
    }
`


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


