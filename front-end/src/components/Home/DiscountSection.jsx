import { Container,Row,Col } from 'react-bootstrap'
import './style/DiscountSection.css'
import dicount from '../../assets/books.jpg'

const DiscountSection = () => {
    return (
        <Container>
            <Row className="discount-backcolor my-3  mx-2 d-flex text-center align-items-center">
                <Col sm="6">
                    <div className="discount-title">
                        خصم يصل حتي ٣٠٪ علي اجهازه اللاب توب
                    </div>
                </Col>
                <Col sm="6">
                    <img className="dicount-img" src={dicount} alt="" />
                </Col>
            </Row>
        </Container>
    )
}

export default DiscountSection;
