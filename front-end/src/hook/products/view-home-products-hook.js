import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMoreSoldProduct } from '../../redux/actions/productsAction';

const viewHomeProductsHook = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch( getMoreSoldProduct() );
    }, []);

    const product = useSelector((state)=> state.allProduct.allProductsArray);
    /*if(product.data){
        console.log(product.data);
    }*/

    let items = [];
    if(product.data){
        items = product.data.slice(0, 4);
    }
    else{
        items = [];
    }

    return [ items ];
}

export default viewHomeProductsHook;