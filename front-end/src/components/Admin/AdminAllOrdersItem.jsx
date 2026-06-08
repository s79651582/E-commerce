import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import '../Cart/style/style.css'
import mobile from '../../assets/phone1.jpg'
import deleteicon from '../../assets/delete.png'



const AdminAllOrdersItem = () => {

    return (
      <Col xs="12" className="cart-item-body my-2 d-flex px-2">
        <Link  to="/admin/allorders/23"  style={{ textDecoration: "none" }}>
            <img  className='cart-img' src={mobile} alt="" />
        </Link>

        <div  className="w-100">
          <Row  className="justify-content-between">
            <Col sm="12" className=" d-flex flex-row justify-content-between">
              <div className="d-inline pt-2 cat-text">الطلب رقم #258</div>
              <div className="d-flex pt-2  deleteicon-cursor" >
                <img src={deleteicon} alt="" className='deleteicon-size' />
                <div className="cat-text d-inline me-2">ازاله</div>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center mt-2">
            <Col sm="12" className=" d-flex flex-row justify-content-start">
              <div className="d-inline pt-2 cat-title">
                آيفون XR بذاكرة سعة 128 جيجابايت ويدعم تقنية 4G LTE مع تطبيق فيس

              </div>
              <div className="d-inline pt-2 cat-rate me-2">4.5</div>
            </Col>
          </Row>

          <Row>
            <Col sm="12" className="mt-1">
              <div className="cat-text d-inline">الماركة :</div>
              <div className="barnd-text d-inline mx-1">ابل </div>
            </Col>
          </Row>
          <Row>
            <Col sm="12" className="mt-1 d-flex">
              <div
                className="color ms-2 border"
                style={{ backgroundColor: "#E52C2C" }}></div>
            </Col>
          </Row>

          <Row className="justify-content-between">
            <Col sm="12" className=" d-flex flex-row justify-content-between">
              <div className="d-inline pt-2 d-flex">
                <div className="cat-text  d-inline">الكميه</div>
                <input  className="mx-2  input-size"  type="number" />
              </div>
              <div className="d-inline pt-2 barnd-text">٣٠٠٠ جنية</div>
            </Col>
          </Row>
        </div>
      </Col>
    )
}

export default AdminAllOrdersItem