import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import './style/ProductDetalis.css'
import { useParams } from 'react-router-dom'
import viewProductsDetalisHook from '../../hook/products/view-products-detalis-hook';

import mobile1 from './../../assets/phone1.jpg'
import mobile2 from './../../assets/phone2.jpg'
import mobile3 from './../../assets/phone3.jpg'
import mobile4 from './../../assets/phone4.jpg'

import LeftButton from './GalleryButtons/LeftButton';
import RightButton from './GalleryButtons/RightButton';


const ProductGallery = () => {

  const { id } = useParams();  // يستخرج الاي دي من الشريط الذي فيه رابط الصفحة
  const [item, images, category, brand] = viewProductsDetalisHook( id );
  //console.log(item);


  /*  const images = [
      {
        original: `${mobile1}`,
        thumbnail: `${mobile1}`,
      },
      {
        original: `${mobile2}`,
        thumbnail: `${mobile2}`,
      },
      {
        original: `${mobile3}`,
        thumbnail: `${mobile3}`,
      },
      {
        original: `${mobile4}`,
        thumbnail: `${mobile4}`,
      }
    ]
  */

    
  return (
    <div className="product-gallary-card  d-flex  justfiy-content-center  align-items-center  pt-2">
      <ImageGallery items={images} 
        //defaultImage={mobile1}
        showFullscreenButton={true}
        isRTL={true}
        showPlayButton={false}
        showThumbnails={true}
        renderRightNav={RightButton}
        renderLeftNav={LeftButton}
      />
    </div>
  )
}

export default ProductGallery