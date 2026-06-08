import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../style/Style.css'
import UserSideBar from '../../components/User/UserSideBar'
import HomePages from '../Home/HomePages'


const UserHomePage = () => {
    return (
        <Container  className='page-height'>
            <Row className='py-3'>
                <Col sm="3" xs="2" md="2">
                    <UserSideBar />
                </Col>

                <Col sm="9" xs="10" md="10">
                    <div className="admin-content-text pb-4">اهلا محمد على</div>
                    <HomePages />
                </Col>
            </Row>
        </Container>
    )
}

export default UserHomePage;