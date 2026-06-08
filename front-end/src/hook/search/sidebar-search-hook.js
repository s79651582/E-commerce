import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction'
import { getAllBrand } from '../../redux/actions/brandAction';
import viewSearchProductsHook from '../products/view-search-products-hook';

const SidebarSearchHook = () => {

    const [ items, pageCount, getPage, getProduct, result ] = viewSearchProductsHook();

    const dispatch = useDispatch();

    //when first load
    useEffect( ()=>{
        let getData = async ()=>{
            await dispatch( getAllCategory() ); 
            await dispatch( getAllBrand() );
        } 
        getData();
    }, []);

    //to get state from redux
    const category = useSelector(state => state.allCategory.category);
    //to get state from redux
    const brand = useSelector(state => state.allBrand.brand);

    // to get category
    let allCategory = [];
    if(category.data){
      allCategory = category.data;
    }

    // to get brand
    let allBrand = [];
    if(brand.data){
      allBrand = brand.data;
    }

    // when user press on any category
    var queryCategory = '' ;
    const [catChick, setCatChick] = useState([]);
    const clickCategory = (e)=>{
        //console.log(e.target.checked);
        //console.log(e.target.value);
        let value = e.target.value
        if(value === "0"){
            //getCatQuery();
            setCatChick([]);
        }
        else{
            if(e.target.checked === true){
                //getCatQuery();
                setCatChick([...catChick, value]);
            }
            else if(e.target.checked === false){
                //getCatQuery();
                // to delete category no chicked user
                const newArray = catChick.filter((e)=> e !== value);
                setCatChick(newArray);
            }
        }
    }
    //console.log(catChick)


    useEffect(()=>{
        queryCategory = catChick.map((value)=> "category[$in][]=" + value).join("&");
        // console.log(queryCategory)
        localStorage.setItem("catChecked", queryCategory);
        setTimeout(() => {
            getProduct();
        }, 1000);
    }, [catChick]);

    /*const getCatQuery = ()=>{
        queryCategory = catChick.map((value)=> "category[$in][]=" + value).join("&");
        // console.log(queryCategory)
        localStorage.setItem("catChecked", queryCategory);
        setTimeout(() => {
            getProduct();
        }, 1000);
    }*/


    // when user press on any brand
    var queryBrand = '';
    const [brandChick, setBrandChick] = useState([]);
    const clickBrand = (e)=>{
        let value = e.target.value
        if(value === "0"){
            //getBranduery();
            setBrandChick([]);
        }
        else{
            if(e.target.checked === true){
                //getBranduery();
                setBrandChick([...brandChick, value]);
            }
            else if(e.target.checked === false){
                //getBranduery();
                // to delete category no chicked user
                const newArray = brandChick.filter((e)=> e !== value);
                setBrandChick(newArray);
            }
        }
    }
    //console.log(brandChick)

    useEffect(()=>{
        queryBrand = brandChick.map((value)=> "brand[$in][]=" + value).join("&");
        // console.log(queryBrand)
        localStorage.setItem("brandChecked", queryBrand);
        setTimeout(() => {
            getProduct();
        }, 1000);
    }, [brandChick]);

    /*const getBranduery = ()=>{
        queryBrand = brandChick.map((value)=> "brand[$in][]=" + value).join("&");
        // console.log(queryBrand)
        localStorage.setItem("brandChecked", queryBrand);
        setTimeout(() => {
            getProduct();
        }, 1000);
    }*/


    const [From, setPriceFrom] = useState(0);
    const [To, setPriceTo] = useState(0);

    const priceFrom = (e)=>{
        localStorage.setItem("priceFrom", e.target.value);
        setPriceFrom(e.target.value)
    }

    const priceTo = (e)=>{
        localStorage.setItem("priceTo", e.target.value);
        setPriceFrom(e.target.value)
    }

    useEffect(()=>{
        setTimeout(() => {
            getProduct();
        }, 1000);
    }, [From, To]);

    

    return [allCategory, allBrand, clickCategory, clickBrand, priceFrom, priceTo]
}

export default SidebarSearchHook;