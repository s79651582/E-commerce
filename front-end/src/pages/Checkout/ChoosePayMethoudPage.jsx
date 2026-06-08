import React from 'react'
import { Container } from 'react-bootstrap'
import '../style/Style.css'
import ChoosePayMethoud from '../../components/Checkout/ChoosePayMethoud'

const ChoosePayMethoudPage = () => {
    return (
        <Container className='page-height'>
           <ChoosePayMethoud />
        </Container>
    )
}

export default ChoosePayMethoudPage