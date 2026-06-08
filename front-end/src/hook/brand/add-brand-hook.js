import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
//import axios from 'axios'
import avatar from '../../assets/avatar.png'
import { createBrand } from '../../redux/actions/BrandAction'
import notify from '../../hook/useNotifaction'


export const AddBrandHook = () => {
    const dispatch = useDispatch();

    const [img , setImg] = useState(avatar);
    const [name , setName] = useState('');
    const [selectedFile , setSelectedFile] = useState(null);
    const [loading , setLoading] = useState(true);
    const [isPress , setIsPress] = useState(false);  // هل المستخدم ضغط على زر الحفظ ام لا

    // to change name state
    // const onChangeName = (e) => setName(e.target.value);
    const onChangeName = (event) => {
        event.persist();  // تستخدم فقط في حالة فصل كود المتغيرات و الدوال عن المكونات
        setName(event.target.value);
    }

    // when image change save it
    const onImageChange = (event)=>{
        // event.target.files --> المستخدم ضغط على صورة الافتار  && event.target.files[0] --> المستخدم اختار صورة من الجهاز -- مسموح بصورة واحدة فقط ولو اختار اكثر من واحدة سيأخد الاولى فقط
        if(event.target.files && event.target.files[0]){
            setImg(URL.createObjectURL(event.target.files[0]));  // المستخدم يختار صورة و نعرضها فورًا
            setSelectedFile(event.target.files[0]);
        }
    }

    const res = useSelector(state => state.allBrand.brand);
    //console.log(res)

    // save data in DB
    const handleSubmit = async (event)=>{
        event.preventDefault();  // لمنع اعادة تحميل الصفحة عند الضغط على هذا الزر

        if(name === '' || selectedFile === null){
            //console.log('ادخل البيانات');
            notify('ادخل البيانات', 'warn');
            return;
        }
        else{
            const formData = new FormData();  // لارسال نصورص مع صور
            formData.append("name", name);
            formData.append("image", selectedFile);

            setIsPress(true);
            // await dispatch(createBrand({ name: "fatema" , email "fatema@gmail.com"}));  ---->  لإرسال نص فقط 
            await dispatch(createBrand(formData));  // لارسال صور و نصوص
            setLoading(false);
        }

        /*  
        const res = axios.post('http://localhost:8000/api/v1/categories/',
            {name:'Asma'},
            headers = {'Content-type':'multipart/form-data'}
        )
        */
    }

    useEffect( ()=>{
        if(loading === false){
            setImg(avatar);
            setName('');
            setSelectedFile(null);
            setLoading(true);
            setIsPress(false);
            //setTimeout( ()=> setIsPress(false) , 3000 );
            if(res.status === 201){
                //console.log('تمت الاضافة بنجاح');
                notify('تمت الاضافة بنجاح', 'success');
            }
            else if(res.status === 400){
                notify('يجب ان يحتوي الاسم حرفين على الاقل', 'error');
            }
            else{
                //console.log('هناك مشكلة في عملية الاضافة');
                notify('هناك مشكلة في عملية الاضافة', 'error');
                console.log(res.status)
            }  
        }
    }, [loading]);


  return [img, name, loading, isPress, onImageChange, handleSubmit, onChangeName];
}

export default AddBrandHook;