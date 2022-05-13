import styled from 'styled-components';

function ProductBox(props) {
    return (
        <Box>
            <div className="top-box">
                <p className="dollar-sign">R$</p>
                <p className="product-price">{props.price}</p>
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
        margin-top: 15px;
        display: flex;
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
