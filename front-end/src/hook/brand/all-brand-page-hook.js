import React, {useEffect} from 'react';
//import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getAllBrandPage } from '../../redux/actions/brandAction'

const allBrandHook = () => {

  const dispatch = useDispatch();

  //when first load
  useEffect( ()=>{
    dispatch(getAllBrandPage(1, 6));    // getAllBrandPage(count of page, limit number of brand in one page)
  }, []);

  //to get state from redux
  const brand = useSelector(state => state.allBrand.brand);
  const loading = useSelector(state => state.allBrand.loading);
  console.log(brand);

  /*
  const get = async ()=>{
    const res = await axios.get("http://localhost:8000/api/v1/categories");
    console.log(res.data);
  }

  useEffect( ()=>{
    get();
  },[])
  */

  // to get page count
  let pageCount = 0;
  if(brand.paginatResult){
    pageCount = brand.paginatResult.numberOfPages;
  }

  const getPage = (page)=>{
    dispatch(getAllBrandPage(page, 6));
    console.log(page);
  }

  return [brand, loading, pageCount, getPage];
}

export default allBrandHook;