import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../style/Style.css'


const LoginPage = () => {
  
    return (
        <Container  className='page-height'>
            <Row className="py-5 d-flex justify-content-center ">
                <Col sm="12" className="d-flex flex-column ">
                    <label className="mx-auto title-login">تسجيل الدخول</label>

                    <input  placeholder="الايميل..."  type="text" className="user-input my-3 text-center mx-auto" />
                    <input  placeholder="كلمه السر..."  type="password"  className="user-input text-center mx-auto" />

                    <button className="btn-login mx-auto mt-4">تسجيل الدخول</button>

                    <label className="mx-auto my-4">
                        ليس لديك حساب ؟{" "}
                        <Link to="/register"  className='textDecoration' >
                            <span  className="text-danger cursor-on-link">
                                اضغط هنا
                            </span>
                        </Link>
                    </label>
                </Col>
                <label className="mx-auto my-4">
                <Link to="/admin/allproducts" className='textDecoration'>
                    <span  className="text-danger cursor-on-link">
                        الدخول ادمن
                    </span>
                </Link>
                <Link to="/user/home" className='textDecoration'>
                    <span  className="text-danger mx-3 cursor-on-link">
                        الدخول مستخدم
                    </span>
                </Link>
            </label>
            </Row>
        </Container>
    )
}

export default LoginPage