import React, {useState} from 'react'
import { Col, Card, Row, Modal, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../redux/actions/productsAction'
import './style/style.css'
import prod1 from '../../assets/drawing.jpg'

const AdminAllProductsCard = ({ prod }) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch();

    const handelDelete = async () => {

        await dispatch(deleteProduct(prod._id))
        setShow(false);
        window.location.reload();
    }

    return (
        <Col xs="12" sm="6" md="5" lg="3" className="d-flex">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header >
                    <Modal.Title> <div className='font-button'>تاكيد الحذف</div></Modal.Title>
                </Modal.Header>
                <Modal.Body><div className='font-button'>هل انت متاكد من عملية الحذف للمنتج</div></Modal.Body>
                <Modal.Footer>
                    <Button className='font-button' variant="success" onClick={handleClose}>
                        تراجع
                    </Button>
                    <Button className='font-button' variant="dark" onClick={handelDelete}>
                        حذف
                    </Button>
                </Modal.Footer>
            </Modal>

            <Card  className="my-2  admin-card" >
                <Row className="d-flex justify-content-center px-2">
                    <Col className=" d-flex justify-content-between">
                        <div  onClick={handleShow}  className="d-inline item-delete-edit">ازاله</div>
                        <div className="d-inline item-delete-edit">تعديل</div>
                    </Col>
                </Row>
                <Link to={`/allproducts/${prod._id}`} style={{ textDecoration: "none" }}>
                    <Card.Img  src={prod.imageCover}  className='admin-card-img' />

                    <Card.Body>
                        <Card.Title>
                            <div className="card-title">
                               {prod.title}
                            </div>
                        </Card.Title>
                        <Card.Text>
                            <div className="d-flex justify-content-between">
                                <div className="card-rate">{prod.ratingsQuantity}</div>
                                <div className="d-flex">
                                    <div className="card-currency mx-1">جنيه</div>
                                    <div className="card-price">{prod.price}</div>
                                </div>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Link>
            </Card>
        </Col>
    )
}

export default AdminAllProductsCard;