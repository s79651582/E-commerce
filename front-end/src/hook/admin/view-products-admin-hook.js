import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductPage } from '../../redux/actions/productsAction';

const viewProductsAdminHook = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch( getAllProductPage(1, 4) );
    }, []);

    const product = useSelector((state)=> state.allProduct.allProductsArray);
    /*if(product.data){
        console.log(product.data);
    }*/

    let items = [];
    if(product.data){
        items = product.data;
    }
    else{
        items = [];
    }

    // to get page count
    let pageCount = [];
    if(product.paginatResult){
        pageCount = product.paginatResult.numberOfPages;
    }
    else{
        pageCount = [];
    }

    const getPage = async (page)=>{
      await dispatch(getAllProductPage(page, 4));
      //console.log(page);
    }

    return [ items, pageCount, getPage ];
}

export default viewProductsAdminHook