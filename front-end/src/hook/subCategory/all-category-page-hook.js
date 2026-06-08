import React, {useEffect} from 'react';
//import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getAllCategoryPage } from '../../redux/actions/categoryAction'

const allCategoryHook = () => {

  const dispatch = useDispatch();

  //when first load
  useEffect( ()=>{
    dispatch(getAllCategoryPage(1, 6));    // getAllCategory(count of page, limit number of category in one page)
  }, []);

  //to get state from redux
  const category = useSelector(state => state.allCategory.category);
  const loading = useSelector(state => state.allCategory.loading);
  console.log(category);

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
  if(category.paginatResult){
    pageCount = category.paginatResult.numberOfPages;
  }

  const getPage = (page)=>{
    dispatch(getAllCategoryPage(page, 6));
    console.log(page);
  }

  return [category, loading, pageCount, getPage];
}

export default allCategoryHook;