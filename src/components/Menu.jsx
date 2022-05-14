import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useWindowDimensions from './Hooks/windowsDimensions';

function FooterProducts(props) {
    const { height, width } = useWindowDimensions();

    function getClassName(screen) {
        if (props.screen === screen) return 'active-buton';
        else return '';
    }

    return (
        <FooterMenu>
            <Link style={{ textDecoration: 'none' }} to={`/products`}>
                <div className={`${getClassName('products')}`}>
                    <ion-icon name="home-outline"></ion-icon>
                    {width > 800 ? <p className="menu-text">Home</p> : <></>}
                </div>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={`/cart`}>
                <div className={`${getClassName('cart')}`}>
                    <ion-icon name="cart-outline"></ion-icon>
                    {width > 800 ? <p className="menu-text">Cart</p> : <></>}
                </div>
            </Link>

            <div>
                <ion-icon name="exit-outline"></ion-icon>
                {width > 800 ? <p className="menu-text">Logout</p> : <></>}
            </div>
        </FooterMenu>
    );
}

const FooterMenu = styled.div`
    position: fixed;
    bottom: -5px;
    right: -5px;
    left: -5px;
    height: 70px;
    background: #38352f;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    box-shadow: 2px -2px 0 rgba(0, 0, 0, 0.2);
    border-radius: 20px 20px 0 0;

    ion-icon {
        font-size: 26px;
        color: #e2c175;
        --ionicon-stroke-width: 35px;
    }

    .active-buton {
        filter: drop-shadow(1px 1px 5px rgba(236, 199, 95, 0.7));
    }

    .menu-text {
        font-size: 26px;
        color: #e2c175;
    }

    @media (min-width: 800px) {
        right: -5px;
        top: -5px;
        width: 170px;
        height: 110%;
        display: flex;
        flex-direction: column;
        align-items: normal;
        justify-content: normal;
        border-radius: 0;
        padding-left: 30px;
        padding-top: 100px;
        div {
            display: flex;
            margin-top: 42px;
        }
        ion-icon {
            margin-right: 10px;
        }
    }
`;

export default FooterProducts;
