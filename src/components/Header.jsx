import styled from 'styled-components';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import logo from './../assets/images/logoFindInstruments.svg';
import bannerImg from './../assets/images/bannerImg.webp';

function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);
    const navigate = useNavigate();

    function logout() {
        if (window.confirm('Logout account?')) {
            setUserInfo({});
            navigate('/');
        }
    }

    return (
        <HeaderComponent>
            <header>
                <div className="left-side">
                    {/* <ion-icon name="menu-outline"></ion-icon>
                    <ion-icon name="search-outline"></ion-icon> */}
                    <Link style={{ textDecoration: 'none' }} to={`/`}>
                        <ion-icon name="home-outline"></ion-icon>
                    </Link>
                </div>
                <img src={logo} alt="Find Instruments Logo" />
                <div className="right-side">
                    <Link style={{ textDecoration: 'none' }} to="/cart">
                        <ion-icon name="cart"></ion-icon>
                    </Link>
                    {!userInfo.token ? (
                        <Link style={{ textDecoration: 'none' }} to={`/login`}>
                            <ion-icon name="person"></ion-icon>
                        </Link>
                    ) : (
                        <ion-icon
                            name="exit-outline"
                            onClick={logout}
                        ></ion-icon>
                    )}
                </div>
            </header>
            <Banner img={bannerImg} color={'blue'}>
                <div className="backdrop"></div>
            </Banner>
        </HeaderComponent>
    );
}

const HeaderComponent = styled.div`
    width: 100vw;
    header {
        width: 95%;
        height: 55px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        z-index: 2;
        background-color: #0000006e;
        padding-left: 15px;
    }

    header .left-side,
    header .right-side {
        display: flex;
    }

    header img {
        width: 100px;
        margin-left: 25px;
    }

    .left-side ion-icon,
    .right-side ion-icon {
        color: #fff;
        font-size: 24px;
        margin-right: 20px;
    }

    header .right-side:last-child {
        margin-right: 0;
    }
`;

const Banner = styled.div`
    width: 100%;
    height: 150px;
    background-image: url(${(props) => props.img});
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
`;

export default Header;
