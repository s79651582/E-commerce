import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../style/Style.css'
import AdminSideBar from '../../components/Admin/AdminSideBar'
import AdminAllProducts from '../../components/Admin/AdminAllProducts'
import Pagination from '../../components/Uitily/Pagination'
import viewProductsAdminHook from '../../hook/admin/view-products-admin-hook'


const AdminAllProductsPage = () => {

    const [items, pageCount, getPage] = viewProductsAdminHook();

    return (
        <Container  className='page-height'>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <AdminSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <AdminAllProducts  products={items} />
                    {
                        pageCount > 1 ? (
                          <Pagination  pageCount={pageCount}  onPress={getPage}/>
                        ) : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default AdminAllProductsPage;