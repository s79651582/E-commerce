import React from 'react'
import {Row, Col} from 'react-bootstrap'
import './style/ProductDetalis.css'
import ProductGallery from './ProductGallery'
import ProductText from './ProductText'

const ProductDetalis = () => {
  return (
    <div>
      <Row className='py-3'>
        <Col lg={5}>
          <ProductGallery />
        </Col>

        <Col lg={7}>
          <ProductText />
        </Col>
      </Row>
    </div>
  )
}

export default ProductDetalis