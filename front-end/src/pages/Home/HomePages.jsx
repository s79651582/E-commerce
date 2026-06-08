import React from 'react';
import '../style/Style.css'
import Slider from '../../components/Home/Slider';
import HomeCategory from '../../components/Home/HomeCategory';
import CardProductsContainer from '../../components/Products/CardProductsContainer';
import DiscountSection from '../../components/Home/DiscountSection';
import BrandFeatured from '../../components/Brand/BrandFeatured';
import viewHomeProductsHook from '../../hook/products/view-home-products-hook';


const HomePages = () => {

  const [ items ] = viewHomeProductsHook();

  return (
    <div className='font page-height'>
        <Slider />
        <HomeCategory />
        <CardProductsContainer  products={items}  title='الاكثر مبيعا'  btntitle='المزيد'  pathText='/allproducts' />

        <DiscountSection />

        <CardProductsContainer  products={items}  title='الاكثر تقييما'  btntitle='المزيد'  pathText='/allproducts' />
        <CardProductsContainer  products={items}  title='احدث الازياء'  btntitle='المزيد'   pathText='/allproducts' />

        <BrandFeatured  title='اشهر الماركات'  btntitle='المزيد' />
    </div>
  )
}

export default HomePages ;