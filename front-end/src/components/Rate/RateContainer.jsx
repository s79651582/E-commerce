import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../Uitily/style/NavbarLogin.css'
import '../Products/style/ProductDetalis.css'
import './style/style.css'
import rate from '../../assets/rate.png'
import Pagination from '../Uitily/Pagination';
import RateItem from './RateItem';
import RatePost from './RatePost';
const RateContainer = () => {
  return (
    <Container className='rate-container'>
      <Row>
        <Col className="d-flex">
          <div className="d-inline p-1  sub-tile"> التقيمات</div>
          <img className="mt-2  img-rate" src={rate} alt="" />
          <div className="d-inline  p-1 pt-2  cat-rate">4.3</div>
          <div className="d-inline p-1 pt-2  rate-count">(160 تقييم)</div>
        </Col>
      </Row>
      <RatePost />
      <RateItem />
      <RateItem />
      <RateItem />
      <RateItem />
      <Pagination />
    </Container>
  )
}

export default RateContainer;