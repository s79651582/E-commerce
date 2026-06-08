import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap';
import '../style/Card.css';
import Sections from '../Uitily/Sections';
import CategoryCard from './../category/CategoryCard';
import HomeCategoryHook from '../../hook/category/home-category-hook';


const HomeCategory = () => {

  const [category, loading, colors] = HomeCategoryHook();

  return (
    <div>
      <Container>
        <Sections  title='التصنيفات'  btntitle='المزيد'  pathText='/allcategory' />
        <Row className='my-2 d-flex justify-content-between'>
          {
            loading === false ? (
              category.data ? (
                category.data.slice(0, 6).map((item, index)=>{
                  return(
                    <CategoryCard key={item._id}  title={item.name}   img={item.image}  background={colors[index]}/>
                  )
                })
              ) : <div className='container-spinner1'> <h4>لا يوجد تصنيفات</h4> </div>
            ) : <div className='container-spinner1'>
                  <Spinner animation='border' variant='primary' className='custom-spinner1' />  
                </div>
          }
        </Row>
      </Container>
    </div>
  )
}

export default HomeCategory;
