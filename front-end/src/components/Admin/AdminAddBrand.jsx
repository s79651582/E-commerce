import React from 'react'
import { Row, Col, Spinner} from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify'
import AddBrandHook from '../../hook/brand/add-brand-hook'


const AdminAddBrand = () => {

    const [img, name, loading, isPress, onImageChange, handleSubmit, onChangeName] = AddBrandHook();

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4">اضف ماركه جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2">صوره الماركه</div>

                    <div>
                        <label  htmlFor="upload-photo">
                            <img src={img} alt="fzx" height="100px" width="120px"  style={ { cursor: 'pointer' } }/>
                        </label>
                        <input
                            type="file"
                            name="photo"
                            id="upload-photo"
                            onChange={onImageChange}
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="اسم الماركه"
                        className="input-form d-block mt-3 px-3"
                        onChange={onChangeName}
                        value={name}
                    />
                </Col>
            </Row>
            
            <Row>
                <Col sm="8" className="d-flex justify-content-start">
                    <button className="btn-save d-inline mt-2"  onClick={handleSubmit}>حفظ التعديلات</button>
                </Col>
            </Row>

            {
                isPress ?
                    loading ?  <Spinner animation='border' variant='primary' className="d-block me-auto custom-spinner2" /> : null
                : null
            }

            <ToastContainer />
        </div>
    )
}

export default AdminAddBrand;