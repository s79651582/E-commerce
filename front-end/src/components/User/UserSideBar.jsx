import React from 'react'
import { Link } from 'react-router-dom'
import '../Admin/style/style.css'

const UserSideBar = () => {
    
    return (
        <div className="sidebar">
            <div className="d-flex flex-column">
                <Link to="/user/home" style={{ textDecoration: 'none' }}>
                    <div className="admin-side-text border-bottom p-2 mx-auto text-center">
                       الصفحة الرئيسية
                    </div>
                </Link>
                
                <Link to="/user/allorders" style={{ textDecoration: 'none' }}>
                    <div className="admin-side-text border-bottom p-2 mx-auto text-center">
                       ادارة الطلبات
                    </div>
                </Link>

                <Link to="/user/favoriteproducts" style={{ textDecoration: 'none' }}>
                    <div className="admin-side-text border-bottom p-2 mx-auto text-center">
                      المفضلة
                    </div>
                </Link>

                <Link to="/user/addresses" style={{ textDecoration: 'none' }}>
                    <div className="admin-side-text border-bottom p-2 mx-auto text-center">
                       عناوين التوصيل
                    </div>
                </Link>

                <Link to="/user/profile" style={{ textDecoration: 'none' }}>
                    <div className="admin-side-text border-bottom p-2 mx-auto text-center">
                       الملف الشخصي
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default UserSideBar;