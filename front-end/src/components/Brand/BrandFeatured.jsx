// BrandFeatured.jsx
import React from 'react'
import { Container, Row, Spinner } from 'react-bootstrap'
import Sections from '../Uitily/Sections'
import BrandCard from './BrandCard'
import HomeBrandHook from '../../hook/brand/home-brand-hook'


const BrandFeatured = ( { title, btntitle, pathText } ) => {

    const [brand, loading] = HomeBrandHook();

    return (
        <Container>
          {
            // اذا استخدمنا هذه الطريقة لا يظهر Spinner
            brand && brand.data && brand.data.length > 0 ? ( 
              <div>
                <Sections  title={title}  btntitle={btntitle}  pathText="/allbrand" />
                <Row className='my-1 d-flex justify-content-between'>
                  {
                    loading === false ? (
                      brand.data ? (
                        brand.data.slice(0, 6).map((item, index)=>{
                          return(
                            <BrandCard key={item._id}  img={item.image}/>
                          )
                        })
                      ) : <div className='container-spinner1'> <h4>لا يوجد تصنيفات</h4> </div>
                    ) : <div className='container-spinner1'>
                          <Spinner animation='border' variant='primary' className='custom-spinner1' />  
                        </div>
                  }
                </Row>
              </div>
            ) : null
          }
        </Container>
    )
}

export default BrandFeatured;
