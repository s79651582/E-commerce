import React from 'react'
import { Container,Row } from 'react-bootstrap'
import Sections from '../Uitily/Sections'
import ProductCard from './ProductCard'


const CardProductsContainer = ( { title, btntitle, pathText, products } ) => {
    return (
        <Container>
            <Sections  title={title}  btntitle={btntitle}  pathText={pathText} />
            <Row className='my-2 d-flex justify-content-between'>
                {
                    products ? (
                        products.map( (item, index)=>(
                            <ProductCard  key={index}  prod={item} />
                        ))
                    ) : null
                }
            </Row>
        </Container>
    )
}

export default CardProductsContainer;