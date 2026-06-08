import React from 'react'
import { Container, Col ,Row} from "react-bootstrap";
import './style/Footer.css'
import facebook from "../../assets/facebook.png";
import instagram from "../../assets/instagram.png";
import twitter from "../../assets/twitter.png";
import phone from "../../assets/phone.png";


const Footer = () => {

    return (
        <div className="footer-background footer mt-3 pt-2" style={{ maxHeight: "50px" }}>
            <Container className="">
                <Row className="d-flex justify-content-between align-items-center">
                    <Col sm="6" className="d-flex align-items-center ">
                        <div className="footer-shroot ">الشروط والاحكام</div>
                        <div className="footer-shroot mx-2">سيايه الخصوصيه</div>
                        <div className="footer-shroot mx-2">اتصل بنا</div>
                    </Col>
                    <Col sm="6" className="d-flex justify-content-end align-items-center ">
                        <div className="d-flex pt-3 mx-2">
                            <img  className='img-in-div' src={phone} alt="" />
                            <p className="footer-phone">01158095105</p>
                        </div>

                        <div  className="div-style">
                            <img  className='img-in-div' src={facebook} alt="" />
                        </div>

                        <div  className="div-style">
                            <img  className='img-in-div' src={instagram} alt="" />
                        </div>

                        <div  className="div-style">
                            <img  className='img-in-div' src={twitter} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer;