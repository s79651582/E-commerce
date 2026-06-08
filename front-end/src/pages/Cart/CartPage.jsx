import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import '../style/Style.css';
import '../../components/Products/style/ProductDetalis.css';
import CartItem from '../../components/Cart/CartItem';
import CartCheckout from '../../components/Cart/CartCheckout';

const CartPage = () => {
  return (
    <Container  className='page-height'>
        <Row>
            <div  className='cart-title mt-4'>عربة التسوق</div>
        </Row>

        <Row  className='d-flex justify-content-center'>
            <Col  xs='12' md='9'>
                <CartItem />
                <CartItem />
                <CartItem />
                <CartItem />
            </Col>

            <Col  xs='6' md='3'>
              <CartCheckout />
            </Col>
        </Row>
    </Container>
  )
}

export default CartPage;