import React from 'react'
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './style/style.css'
import deleteicon from '../../assets/delete.png'


const UserAddressCard = () => {

    return (
        <div className="user-address-card my-3 px-2">
            <Row className="d-flex justify-content-between  ">
                <Col xs="1">
                    <div className="p-2">المنزل</div>
                </Col>
                <Col xs="4" className="d-flex d-flex justify-content-end">
                    <div className="d-flex p-2">
                        <div className="d-flex mx-2">
                            <i className="far fa-edit  edit-icon" ></i>
                            <Link to="/user/edit-address" style={{ textDecoration: "none" }}>
                                <p className="item-delete-edit"> تعديل</p>
                            </Link>
                        </div>
                        <div className="d-flex ">
                            <img  alt=""  className="edit-icon"  src={deleteicon} />
                            <p className="item-delete-edit"> ازاله</p>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col xs="12">
                    <div className='address'>
                        القاهرة مدينه نصر شارع التسعين عماره ١٤
                    </div>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col xs="12" className="d-flex">
                    <div className='address'>
                        رقم الهاتف:
                    </div>

                    <div className="mx-2  address">
                        0021313432423
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserAddressCard;