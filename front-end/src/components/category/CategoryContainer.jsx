import React, {useEffect} from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import './style/category.css'
import Sections from '../Uitily/Sections'
import CategoryCard from './CategoryCard'


const CategoryContainer = ( {data, loading} ) => {

  const colors = ['#f4dba4' , '#39d7fbff' , 'rgb(241, 158, 197)' , '#c3ffe7ff' , 'rgb(247, 132, 255)'];

  return (
    <div>
      <Container>
        <Sections  title='التصنيفات' />
        <Row className='my-2 d-flex justify-content-between'>
          {
            loading === false ? (
              data ? (
                data.map((item, index)=>{
                  return(
                    <CategoryCard key={item._id}  title={item.name}   img={item.image}  background={colors[index % colors.length]}/>
                  )
                })
              ) : <div className='container-spinner'> <h4>لا يوجد تصنيفات</h4> </div>
            ) : <div className='container-spinner'>
              <Spinner animation='border' variant='primary' className='custom-spinner' />  
            </div>
          }
        </Row>
      </Container>
    </div>
  )
}

export default CategoryContainer;


// <Spinner animation='border' variant="secondary" />    // يصبح لونه رمادي