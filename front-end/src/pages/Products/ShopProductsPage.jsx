import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import '../style/Style.css'
import CategoryHeader from '../../components/category/CategoryHeader';
import CartFilter from '../../components/Uitily/CartFilter';
import SideFilter from '../../components/Uitily/SideFilter';
import CardProductsContainer from '../../components/Products/CardProductsContainer';
import Pagination from '../../components/Uitily/Pagination';
import viewSearchProductsHook from '../../hook/products/view-search-products-hook';


const ShopProductsPage = () => {

  const [ items, pageCount, getPage, getProduct, result ] = viewSearchProductsHook();

  return (
    <div  className='page-height'>
      <CategoryHeader />
      <Container>
        <CartFilter onClick={getProduct} title={`نتيجة البحث ${result} منتجات `} />
        <Row className='d-flex flex-row'>
          <Col sm="2" xs="2" md="1" className='d-flex'>    {/* sm="2" + sm="10" = 12 col */}
            <SideFilter />
          </Col>
          <Col sm="10" xs="10" md="11">
            <CardProductsContainer  products={items}  title=""  btntitle="" />
          </Col>
        </Row>
        {
          pageCount > 1 ? (
            <Pagination  pageCount={pageCount}  onPress={getPage}/>
          ) : null
        }
      </Container>
    </div>
  )
}

export default ShopProductsPage;