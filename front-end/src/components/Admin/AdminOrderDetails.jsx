import React from 'react'
import { Row,Col } from 'react-bootstrap'
import './style/style.css'
import './style/AdminOrderDetalis.css'
import CartItem from '../Cart/CartItem'

const AdminOrderDetalis = () => {


    return (
        <div>
            <div className='admin-content-text'>تفاصيل الطلب رقم#55</div>

            <CartItem />
            <CartItem />
            <CartItem />

            <Row className="justify-content-center mt-4 user-data">
                <Col xs="12" className=" d-flex">
                  <div className="admin-content-text py-2">تفاصيل العميل</div>
                </Col>

                <Col xs="12" className="d-flex">
                  <div className='client-details'>الاسم:</div>
                  <div className="mx-2  client-name"> احمد عبداللة </div>
                </Col>

                <Col xs="12" className="d-flex">
                    <div  className='client-details'> رقم الهاتف:</div>

                    <div className="mx-2 client-name"> 0021313432423 </div>
                </Col>
                <Col xs="12" className="d-flex">
                    <div className='client-details'> الايميل: </div>

                    <div  className="mx-2  client-name"> ahmed@gmail.com </div>
                </Col>
                <div className=" d-inline px-4 border text-center pt-2 final-price">
                    المجموع ٤٠٠٠ جنيه
                </div>
                <div className="d-flex mt-2 justify-content-center">
                    <select
                        name="languages"
                        id="lang"
                        className="select input-form-area mt-1  text-center px-2 w-50">
                        <option value="val">حالة الطلب</option>
                        <option value="val2">قيد التنفيذ</option>
                        <option value="val2">تم الانتهاء</option>
                        <option value="val2">الغاء</option>
                    </select>
                    <button className="btn-a px-3 d-inline mx-2 ">حفظ </button>
                </div>
            </Row>
        </div>
    )
}

export default AdminOrderDetalis;