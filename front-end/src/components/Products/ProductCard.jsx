import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './style/Products.css';
import prod1 from './.././../assets/drawing.jpg'
import favoff from './.././../assets/fav-off.png'
import rate from './.././../assets/rate.png'


const ProductCard = ( {prod} ) => {

  return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex">
      <Card className="my-2 style-card">
          <Link to={`/allproducts/${prod._id}`}  className="link-style" >
              <Card.Img  className='card-img-style'  src={prod.imageCover} />
          </Link>

          <div className="d-flex justify-content-end mx-2">
              <img src={favoff}  alt="favof"  className="text-center favof-style" />
          </div>

          <Card.Body>
              <Card.Title>
                  <div className="card-title">
                     {prod.title}
                  </div>
              </Card.Title>

              <Card.Text  as="div" >
                  <div className="d-flex justify-content-between ">
                      <div className="d-flex">
                          <img  src={rate}  alt="rate"  className="rate-style" />
                          <div className="card-rate mx-2">{prod.ratingsQuantity}</div>
                      </div>

                      <div className="d-flex">
                          <div className="card-price">{prod.price}</div>
                          <div className="card-currency mx-1">جنيه</div>
                      </div>
                  </div>
              </Card.Text>
          </Card.Body>
      </Card>
    </Col>
  )
}

export default ProductCard;
