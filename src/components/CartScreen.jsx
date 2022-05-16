import axios from 'axios';
import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import CartProductBox from './CartProductBox';
import Header from './Header';

function CartScreen() {
    const API_URL = 'https://back-findinstruments.herokuapp.com/cart';
    const API_URL_PURCHASE =
        'https://back-findinstruments.herokuapp.com/purchase';

    const { userInfo } = useContext(UserContext);

    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
    };

    useEffect(() => {
        if (!userInfo.token) {
            navigate('/');
        } else {
            const promise = axios.get(API_URL, config);
            promise.then((response) => {
                const { data } = response;
                setProducts(data.products);
                calcTotalPrice();
            });
            promise.catch((err) => {
                console.log(err.response.data.message);
            });
        }
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

    function confirmPurchase() {
        if (!userInfo.token) {
            alert('Please login to your account');
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const purchaseInfo = {
            username: userInfo.name,
            email: userInfo.email,
            totalPrice: totalPrice,
        };
        const promise = axios.post(API_URL_PURCHASE, purchaseInfo, config);

        promise.then((response) => {
            alert(
                'Compra confirmada, ' +
                    purchaseInfo.username +
                    '! Agradecemos a preferência!'
            );
            reloadProducts();
        });
        promise.catch((err) => {
            alert(err.response.data.message);
        });
    }

    function setCartScreeContent() {
        return products.length === 0 ? (
            <main>
                <div className="empty-cart-screen">
                    <p>Seu carrinho está vazio!</p>
                </div>
            </main>
        ) : (
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

                <p className="total-price-text">
                    Preço total: R$ {totalPrice.toString().replace('.', ',')}
                </p>
                <button className="confirm-button" onClick={confirmPurchase}>
                    Confirmar Compra
                </button>
            </main>
        );
    }

    const cartContent = setCartScreeContent();

    return (
        <>
            <CartProducts>
                <Header />
                {cartContent}
            </CartProducts>
        </>
    );
}

const CartProducts = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    main {
        display: flex;
        flex-direction: column;
        margin-top: 200px;
        width: 100%;
        max-width: 700px;
        padding-right: 30px;
        padding-left: 30px;
        margin-bottom: 100px;
    }

    .total-price-text,
    .empty-cart-screen {
        font-size: 18px;
        font-weight: 500;
        margin-top: 20px;
    }

    .confirm-button {
        width: 80vw;
        max-width: 300px;
        height: 60px;
        color: white;
        background-color: #189e5b;
        border: none;
        border-radius: 5px;
        font-size: 20px;
        margin: 30px auto;
    }
`;

export default CartScreen;
