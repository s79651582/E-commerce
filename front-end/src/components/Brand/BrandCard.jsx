import React from 'react'
import { Col,Card } from 'react-bootstrap'
import './style/BrandCard.css'


const BrandCard = ({img}) => {
    
    return (
        <Col xs="6" sm="6" md="4" lg="2" className="my-2 d-flex justify-content-center">
        <Card className="my-1  card-style">
          <Card.Img  className="card-img-style"  src={img} />
        </Card>
      </Col>
    )
}

export default BrandCard;