import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction';
import { createSubCategory } from '../../redux/actions/subCategoryAction'
import notify from '../../hook/useNotifaction'


export const AddSubCategoryHook = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        if(!navigator.online){
            notify('هناك مشكلة في الاتصال بالانترنت', 'error');
        }
        dispatch(getAllCategory());
    },[]);  // [] --> يعني ستنفذ مرة واحدة فقط عند اول مرة تحمل فيها الصفحة

    const [id, setID] = useState('0');
    const [name, setName] = useState('');
    const [loading , setLoading] = useState(true);

    // get last category state from redux
    const category = useSelector(state => state.allCategory.category);
    /*if(category){
        console.log(category.data);
    }*/

    // get last subcategory state from redux
    const subCategory = useSelector(state => state.allSubCategory.subCategory);
    const error = useSelector(state => state.allSubCategory.error);

    const onChangeName = (e)=>{
        e.persist();
        setName(e.target.value);
    }

    // on change dropdown menu
    const handelChange = (e)=>{
        console.log(e.target.value);
        setID(e.target.value);
    }

    // on save data
    const handelSubmit = async (e)=>{
        e.preventDefault();

        // check internet online
        if(!navigator.online){
            notify('هناك مشكلة في الاتصال بالانترنت', 'error');
        }

        if( name === ''){
            notify('ادخل اسم التصنيف', 'warn');
        }
        else if( id === '0'){
            notify('ادخل اسم التصنيف الرئيسي', 'warn');
        }
        else{
            setLoading(true);
            await dispatch(createSubCategory( {
                name ,  // or  name: name
                category: id
            } ));
            setLoading(false);
        }

    }

    useEffect(()=>{
        if(loading === false){
            setName('');
            setID('0');
            if(subCategory){
                console.log(subCategory.data)
            }

            setLoading(true);

            if(subCategory && subCategory.status === 201){
                notify('تمت الاضافة بنجاح', 'success');
            }
            else if(error === 'Error AxiosError: Request failed with status code 400'){
                notify('يجب ان يحتوي الاسم على حرفين او اكثر', 'error');
            }
            else if(error === 'Error AxiosError: Request failed with status code 500'){
                notify('هذا الاسم مكرر من فضلك ادخل اسما اخر', 'error');
            }
            else{
                notify('هناك مشكلة في عملية الاضافة', 'error');
                console.log(subCategory.status)
            }
            
            /*if(subCategory.status === 400){
                notify('يجب ان يحتوي الاسم على حرفين او اكثر', 'error');
            }else if(subCategory.status === 500){
                notify('هذا الاسم مكرر من فضلك ادخل اسما اخر', 'error');
            }
            else{
                notify('هناك مشكلة في عملية الاضافة', 'error');
                console.log(subCategory.status)
            }*/
        }
    },[loading]);


  return [id, name, category, subCategory, loading, handelChange, handelSubmit, onChangeName];
}

export default AddSubCategoryHook;