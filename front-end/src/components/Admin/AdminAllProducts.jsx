import React from 'react'
import { Row } from 'react-bootstrap'
import './style/style.css'
import AdminAllProductsCard from './AdminAllProductsCard'


const AdminAllProducts = ({ products }) => {
    return (
        <div>
            <div className='admin-content-text'>ادارة جميع المنتجات</div>
            
            <Row className='justify-content-start'>
                {
                    products ? (
                        products.map((item, index)=>(
                            <AdminAllProductsCard  key={index}  prod={item} />
                        ))
                    ) : <h4>لا توجد منتجات حتى الان</h4>
                }
            </Row>
        </div>
    )
}

export default AdminAllProducts;