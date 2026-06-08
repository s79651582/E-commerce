import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../style/Style.css'
import UserSideBar from '../../components/User/UserSideBar'
import UserFavoriteProducts from '../../components/User/UserFavoriteProducts'
import Pagination from '../../components/Uitily/Pagination'



const UserFavoriteProductsPage = () => {
    return (
        <Container  className='page-height'>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <UserFavoriteProducts />
                    <Pagination />
                </Col>
            </Row>
        </Container>
    )
}

export default UserFavoriteProductsPage;