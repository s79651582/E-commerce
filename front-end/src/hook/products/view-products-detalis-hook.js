import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../redux/actions/productsAction';
import { getProductSimilar } from '../../redux/actions/productsAction';
import { getOneCategory } from '../../redux/actions/categoryAction';
import { getOneBrand } from '../../redux/actions/brandAction';
import mobile1 from './../../assets/phone1.jpg'

const viewProductsDetalisHook = ( prodID ) => {
    
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch( getOneProduct( prodID ) );
    }, []);

    const oneProduct = useSelector((state)=> state.allProduct.oneProduct);
    /*if(oneProduct.data){
        console.log(oneProduct.data);
    }*/

    const ProductSimilar = useSelector((state)=> state.allProduct.ProductSimilar);

    const oneCategory = useSelector((state)=> state.allCategory.oneCategory);
    /*if(oneCategory.data){
        console.log(oneCategory.data);
    }*/

    const oneBrand = useSelector((state)=> state.allBrand.oneBrand);
    /*if(oneCategory.data){
        console.log(oneCategory.data);
    }*/


    //to show products item
    let item = [];
    if(oneProduct.data){
        item = oneProduct.data;
        console.log(item)
    }
    else{
        item = [];
    }

    // get category id from item ---- item = product
    useEffect(()=>{
        if(item.category){
            dispatch( getOneCategory( item.category._id ) );
            dispatch( getProductSimilar( item.category._id ) );
            //console.log(item.category._id)
        }
        if(item.brand){
            dispatch( getOneBrand( item.brand._id ) );
            //console.log(item.brand._id)
        }
    }, [item])


    //to view images gallery
    let images = [];
    if(item.images){
      images = item.images.map((img)=>(
        { original: img }
      ))
    }
    else{
      images = [{ original: `${mobile1}` }]
    }

    //to show category item
    let category = [];
    if(oneCategory.data){
        category = oneCategory.data;
    }
    else{
        category = [];
    }

    //to show brand item
    let brand = [];
    if(oneBrand.data){
        brand = oneBrand.data;
    }
    else{
        brand = [];
    }

    //to show products Similar of current product
    let similarProd = [];
    if(ProductSimilar){
        similarProd = ProductSimilar.data;
    }
    else{
        similarProd = [];
    }

    return [ item, images, category, brand, similarProd ];
}

export default viewProductsDetalisHook;