//SearchCountResult.jsx
import React from 'react'
import UnopDropdown from "unop-react-dropdown";
import './style/NavbarLogin.css';
import './style/CartFilter.css';
import sort from '../../assets/sort.png'


const CartFilter = ({title, onClick}) => {

    const handler = ()=> {

    }

    const clickOption = (key)=>{
        localStorage.setItem("sortType", key);
        onClick();
        //console.log(key);
    }

    return (
        <div className="d-flex justify-content-between pt-3 px-2">
            <div className="sub-tile">{title}</div>
            <div className="search-count-text d-flex ">
                <UnopDropdown
                    onAppear={handler}
                    onDisappearStart={handler}
                    trigger={
                        <p className="mx-1">
                            <img  src={sort}  alt=""  className="ms-1 img-style" />
                            ترتيب حسب
                        </p>
                    }
                    delay={0}
                    align="CENTER"
                    hover>
                    <div className="card-filter">
                        <div onClick={()=> clickOption("")} className="border-bottom card-filter-item">بدون ترتيب</div>
                        <div onClick={()=> clickOption("الاكثر مبيعا")} className="border-bottom card-filter-item">الاكثر مبيعا</div>
                        <div onClick={()=> clickOption("الاعلي تقييما")} className="border-bottom card-filter-item">الاعلي تقييما</div>
                        <div onClick={()=> clickOption("السعر من الاقل للاعلي")} className="border-bottom card-filter-item">السعر من الاقل للاعلي</div>
                        <div onClick={()=> clickOption("السعر من الاعلي للاقل")} className=" card-filter-item">السعر من الاعلي للاقل</div>
                    </div>
                </UnopDropdown>
            </div>
        </div>
    )
}

export default CartFilter;