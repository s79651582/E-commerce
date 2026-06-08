import React from 'react'
import { Row } from 'react-bootstrap'
import './style/CartFilter.css';
import SidebarSearchHook from '../../hook/search/sidebar-search-hook';


const SideFilter = () => {

  const [allCategory, allBrand, clickCategory, clickBrand, priceFrom, priceTo] = SidebarSearchHook()

  let localFrom = localStorage.getItem("priceFrom");
  let localTo = localStorage.getItem("priceTo");

  return (
    <div className="mt-3">
      <Row>
        <div className="d-flex flex-column mt-2">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input type="checkbox" value="0" />
            <div className="filter-sub me-2 margin-div">الكل</div>
          </div>

          {
            allCategory ? (
              allCategory.map((item, index)=>(
                <div key={index} className="d-flex mt-3">
                  <input  type="checkbox"  value={item._id}  onChange={clickCategory} />
                  <div className="filter-sub me-2 margin-div">{item.name}</div>
                </div>
              ))
            ) : <h6> لا يوجد تصنيفات </h6>
          }
        </div>

        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3 margin-div">الماركة</div>
          <div className="d-flex mt-3">
            <input type="checkbox" value="0" />
            <div className="filter-sub me-2 margin-div">الكل</div>
          </div>
        </div>

          {
            allBrand ? (
              allBrand.map((item, index)=>(
                <div key={index} className="d-flex mt-3">
                  <input  type="checkbox"  value={item._id}  onChange={clickBrand} />
                  <div className="filter-sub me-2 margin-div">{item.name}</div>
                </div>
              ))
            ) : <h6> لا يوجد ماركات </h6>
          }

        <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input  value={localFrom}  onChange={priceFrom}  className="m-2 text-center input-style"  type="number" />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input  value={localTo}  onChange={priceTo}  className="m-2 text-center input-style"  type="number" />
        </div>
      </Row>
    </div>
  )
}

export default SideFilter;