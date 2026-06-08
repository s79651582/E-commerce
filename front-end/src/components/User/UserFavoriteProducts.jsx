import React from 'react'
import { Row } from 'react-bootstrap';
import ProductCard from './../Products/ProductCard';
import Pagination from '../Uitily/Pagination'


const UserFavoriteProducts = () => {

    return (
        <div>
            <div className="admin-content-text pb-4">قائمة المفضلة</div>
            <Row className='justify-content-start'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </Row>
        </div>
    )
}

export default UserFavoriteProducts;