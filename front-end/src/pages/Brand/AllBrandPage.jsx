import React from 'react'
import '../style/Style.css'
import BrandContainer from '../../components/Brand/BrandContainer'
import Pagination from '../../components/Uitily/Pagination'
import allBrandHook from '../../hook/brand/all-brand-page-hook'

const AllBrandPage = () => {

  const [brand, loading, pageCount, getPage] = allBrandHook();
    
  return (
    <div  className='page-height'>
      <BrandContainer data={brand.data}  loading={loading}/>
      {
        pageCount > 1 ? (
          <Pagination  pageCount={pageCount}  onPress={getPage}/>
        ) : null
      }
    </div>
  )
}

export default AllBrandPage