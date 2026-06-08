import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductSearch } from '../../redux/actions/productsAction';

const viewSearchProductsHook = () => {

    const dispatch = useDispatch();

    const limit = 4;
    const getProduct = async ()=>{
        getLocalStorage();
        sortProduct();

        await dispatch( getAllProductSearch(`limit=${limit}&keyword=${word}&sort=${sort}&${queryCategory}&${queryBrand}${priceFromString}${priceToString}`) );
    }

    useEffect(()=>{
        getProduct();
    }, []);

    const product = useSelector((state)=> state.allProduct.allProductsArray);
    /*if(product.data){
        console.log(product.data);
    }*/

    let items = [];
    try{
        if(product.data){
            items = product.data;
        }
        else{
            items = [];
        }
    }catch(e){

    }

    // to get page count
    let pageCount = [];
    try{
        if(product.paginatResult){
            pageCount = product.paginatResult.numberOfPages;
        }
        else{
            pageCount = [];
        }
    }catch(e){

    }


    let result = 0;
    try{
        if(product.totalResults){
            result = product.totalResults;
        }
        else{
            result = 0;
        }
    }catch(e){

    }
    

    // when click pagination
    const getPage = async (page)=>{
        //console.log(page);
        getLocalStorage();
        sortProduct();

        await dispatch( getAllProductSearch(`limit=${limit}&page=${page}&keyword=${word}&sort=${sort}&${queryCategory}&${queryBrand}${priceFromString}${priceToString}`) );
    }


    let priceFromString = "", priceToString = "";
    let word = '', queryCategory = '', queryBrand = '', priceFrom = '', priceTo = '';
    const getLocalStorage = ()=>{
        if(localStorage.getItem("searchWord") != null){
            word = localStorage.getItem("searchWord");
        }
        
        if(localStorage.getItem("catChecked") != null){
            queryCategory = localStorage.getItem("catChecked");
        }

        if(localStorage.getItem("brandChecked") != null){
            queryBrand = localStorage.getItem("brandChecked");
        }

        if(localStorage.getItem("priceFrom") != null){
            priceFrom = localStorage.getItem("priceFrom");
        }

        if(localStorage.getItem("priceTo") != null){
            priceTo = localStorage.getItem("priceTo");
        }


        if(priceFrom === "" || priceFrom <= 0){
            priceFromString = "";
        }else{
            priceFromString = `&price[gt]=${priceFrom}`;
        }

        if(priceFrom === "" || priceFrom <= 0){
            priceToString = "";
        }else{
            priceToString = `&price[lte]=${priceTo}`;
        }
    }


    // when user choose sort type
    let key = "" , sort;
    const sortProduct = ()=>{
        if(localStorage.getItem("sortType") !== null){
            key = localStorage.getItem("sortType");
        }else{
            key = "";
        }
        
        if(key === ""){
            sort = "";
        }
        else if(key === "الاكثر مبيعا"){
            //sort = encodeURIComponent("+sold");
            sort = "sold";
        }
        else if(key === "الاعلي تقييما"){
            //sort = encodeURIComponent("+ratingsQuantity");
            sort = "ratingsQuantity";
        }
        else if(key === "السعر من الاعلي للاقل"){
            //sort = encodeURIComponent("+price");
            sort = "price";
        }
        else if(key === "السعر من الاقل للاعلي"){
            sort = "-price";
        }
    }


    return [ items, pageCount, getPage, getProduct, result ];
}

export default viewSearchProductsHook;