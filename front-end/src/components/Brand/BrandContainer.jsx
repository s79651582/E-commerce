import React, {useEffect} from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
// import '../category/style/category.css'
import Sections from '../Uitily/Sections'
import BrandCard from './BrandCard'

const BrandContainer = ( {data, loading} ) => {
    return (
      <Container>
        <Sections  title='الماركات' />
        <Row className='my-1 d-flex justify-content-between'>
          {
            loading === false ? (
              data ? (
                data.map((item, index)=>{
                  return(
                    <BrandCard key={item._id}  img={item.image}/>
                  )
                }) 
              ) : <div className='container-spinner'> <h4>لا يوجد ماركات</h4> </div>
            ) : <div className='container-spinner'>
              <Spinner animation='border' variant='primary' className='custom-spinner' />  
            </div>
          }
        </Row>
      </Container>
    )
}

export default BrandContainer