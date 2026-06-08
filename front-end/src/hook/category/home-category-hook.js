import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategoryPage } from '../../redux/actions/categoryAction';

const HomeCategoryHook = () => {

  const dispatch = useDispatch();
  
  useEffect( ()=>{
    dispatch(getAllCategoryPage(1, 6));
  }, []);

  //to get state from redux
  const category = useSelector(state => state.allCategory.category);
  const loading = useSelector(state => state.allCategory.loading);

  console.log(category);
  

  const colors = ['#f2cf83' , '#39d7fbff' , 'rgb(241, 158, 197)' , 'rgb(186, 248, 223)' , 'rgb(247, 132, 255)' , 'rgb(247, 255, 132)'];


  return [category, loading, colors];
}

export default HomeCategoryHook;