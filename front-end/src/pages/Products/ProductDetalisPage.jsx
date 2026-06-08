import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import '../style/Style.css'
import CategoryHeader from '../../components/category/CategoryHeader.jsx'
import CardProductsContainer from '../../components/Products/CardProductsContainer'
import ProductDetalis from '../../components/Products/ProductDetalis.jsx'
import RateContainer from '../../components/Rate/RateContainer'
import viewProductsDetalisHook from '../../hook/products/view-products-detalis-hook.js'


const ProductDetalisPage = () => {

    const { id } = useParams();  // id --> product id
    const [ item, images, category, brand, similarProd ] = viewProductsDetalisHook( id );
    if(similarProd){
        var prod = similarProd.slice(0, 4);
    }

    return (
        <div className='page-height'>
            <CategoryHeader />
            <Container>
                <ProductDetalis />
                <RateContainer />
                <CardProductsContainer title="منتجات قد تعجبك"  products={similarProd} />
            </Container>
        </div>
    )
}

export default ProductDetalisPage