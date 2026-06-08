import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../style/Style.css'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAddBrand from '../../components/Admin/AdminAddBrand'


const AdminAddBrandPage = () => {
    return (
        <Container  className='page-height'>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAddBrand />
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAddBrandPage;