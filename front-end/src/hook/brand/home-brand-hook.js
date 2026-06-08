import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllBrandPage } from '../../redux/actions/brandAction';

const HomeBrandHook = () => {

  const dispatch = useDispatch();
  
  useEffect( ()=>{
    dispatch(getAllBrandPage(1, 6));
  }, []);

  //to get state from redux
  const brand = useSelector(state => state.allBrand.brand);
  const loading = useSelector(state => state.allBrand.loading);

  console.log(brand);


  return [brand, loading];
}

export default HomeBrandHook;