import React, {useState, useEffect} from 'react'
import { Row, Col } from 'react-bootstrap'
import Multiselect from 'multiselect-react-dropdown';
import MultiImageInput from 'react-multiple-image-input';
import { CompactPicker } from 'react-color';   // import { SketchPicker } from 'react-color'; --> تعطي شكل اخر للالوان و خيارات اكثر
import './style/style.css'
import avatar from '../../assets/avatar.png'
import add from '../../assets/add.png'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getSubcategories } from '../../redux/actions/subCategoryAction';
import { getAllBrand } from '../../redux/actions/brandAction';
import { createProduct } from '../../redux/actions/productsAction';
import notify from '../../hook/useNotifaction';



const AdminAddProducts = () => {

    const dispatch = useDispatch();
    useEffect(()=>{
        if(!navigator.online){
            notify('هناك مشكلة في الاتصال بالانترنت', 'error');
        }
        dispatch(getAllCategory());
        dispatch(getAllBrand());
    },[]);

    // get last category state from redux
    const category = useSelector(state => state.allCategory.category);
    /*if(category){
        console.log(category.data)
    }*/

    // get last subCategory state from redux
    const subCategory = useSelector(state => state.allSubCategory.subCategory);

    // get last brand state from redux
    const brand = useSelector(state => state.allBrand.brand);
    /*if(brand){
        console.log(brand.data)
    }*/
    

    //values images products
    const [images, setImages] = useState({});
    //values state
    const [prodName, setProdName] = useState('');
    const [prodDescription, setProdDescription] = useState('');
    const [priceBefore, setPriceBefore] = useState();
    const [priceAftr, setPriceAftr] = useState();
    const [qty, setQty] = useState();
    const [CatID, setCatID] = useState('');
    const [BrandID, SetBrandID] = useState('');
    //const [subCatID, setSubCatID] = useState([]);
    const [seletedSubID, setSeletedSubID] = useState([]);
    //to show hide color picker
    const [showColor, setShowColor] = useState(false);
    //to store the selected all pick color in array
    const [colors, setColors] = useState([]);
    //options of subCategory
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    // when select category to store id 
    const onSelectCategory = async (e)=>{
        if(e.target.value !== 0){
            await dispatch( getSubcategories(e.target.value) );  //get list of subcategory of specific category
        }
        setCatID(e.target.value);
    }
    //console.log(CatID)

    //select subcategory from subcategory list of specific category
    useEffect(()=>{
        if(CatID != 0){
            if(subCategory.data){
                setOptions(subCategory.data);
            }
        }
    },[CatID]);

    // when select brand to store id 
    const onSelectBrand = (e)=>{
        SetBrandID(e.target.value);
    }
    //console.log(BrandID)

    // product color (open and close CompactPicker)
    const onChangeColor = (event) => {
        // event.persist();  --> يستخدم عند تمرير اوبجيكت لكن في هذه الحاله نحن نمرر بوليان
        setShowColor(!showColor)
    }

    //when choose new color
    const handelChangeComplete = (color) => {
        // ...colors --> القيم الموجودة سابقا في الاراي
        // color.hex --> such as #111
        // check if color already exists or no
        if (!colors.includes(color.hex)) {
            setColors([...colors, color.hex]);
        }
        //setColors([...colors, color.hex]);
        setShowColor(!showColor); // close CompactPicker
    }
    //console.log(colors)

    const removeColor = (colorRemoved) => {
        const newColor = colors.filter((e) => e !== colorRemoved);
        setColors(newColor);
    }


    const onSelect = (selectedList) => {
        //console.log(seletedSubID)
        setSeletedSubID(selectedList);
    }
    const onRemove = (selectedList) => {
        //console.log(seletedSubID)
        setSeletedSubID(selectedList);
    }
    

    /*
    const options = [
      { name: "التصنيف الاول", id: 1 },
      { name: "التصنيف الثاني", id: 2 },
    ];
    */

    // save image
    //to convert base 64 to file
    function dataURLtoFile(dataurl, filename) {

        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }


    // to save data
    const handelSubmit = async (e)=>{
        e.preventDefault();
        if (prodName === "" || prodDescription === "" || CatID === 0  || images.length <= 0 || priceBefore <= 0){
            //console.log('ادخل البيانات');
            notify('ادخل البيانات', 'warn');
            return;
        }
        else{
            //convert base 64 image to file 
            const imgCover = dataURLtoFile(images[0], Math.random() + ".png");
            //convert array of base 64 image to file 
            const itemImages = Array.from(Array(Object.keys(images).length).keys()).map(
                (item, index) => {
                    return dataURLtoFile(images[index], Math.random() + ".png")
                }
            );

            const formData = new FormData();  // لارسال نصوص مع صور
            formData.append("title", prodName);
            formData.append("description", prodDescription);
            formData.append("quantity", qty);
            formData.append("price", priceBefore);
            //formData.append("colors", colors);
            formData.append("imageCover", imgCover);   // imgCover = images[0]
            //formData.append("images", images);
            formData.append("category", CatID);
            formData.append("brand", BrandID);
            //formData.append("subcategories", options);
            
            /*console.log(prodName)
            console.log(prodDescription)
            console.log(qty)
            console.log(priceBefore)
            console.log(imgCover)
            console.log(BrandID)*/


            //setIsPress(true);
            // await dispatch(createProduct({ name: "fatema" , email "fatema@gmail.com"}));  ---->  لإرسال نص فقط 
            await dispatch(createProduct(formData));  // لارسال صور و نصوص
            //setLoading(false);
        }
    }

    return (
        <div>
            <Row className="justify-content-start ">
                <div className="admin-content-text pb-4"> اضافه منتج جديد</div>
                <Col sm="8">
                    <div className="text-form pb-2"> صور للمنتج</div>
                        <MultiImageInput
                          images={images}
                          setImages={setImages}
                          theme="light" // or "dark"
                          max={5} // limit the number of images
                          allowCrop={false}
                          theme={{
                            background : '#f9f9f9',
                            outlineColor : '#979797'
                          }}
                        />
                    <input
                        type="text"
                        className="input-form d-block mt-3 px-3"
                        placeholder="اسم المنتج"
                        value={prodName}
                        onChange={ (e)=> setProdName(e.target.value) }
                    />
                    <textarea
                        className="input-form-area p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="وصف المنتج"
                        value={prodDescription}
                        onChange={ (e)=> setProdDescription(e.target.value) }
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="السعر قبل الخصم"
                        value={priceBefore}
                        onChange={ (e)=> setPriceBefore(e.target.value) }
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="السعر بعد الخصم"
                        value={priceAftr}
                        onChange={ (e)=> setPriceAftr(e.target.value) }
                    />
                    <input
                        type="number"
                        className="input-form d-block mt-3 px-3"
                        placeholder="الكمية"
                        value={qty}
                        onChange={ (e)=> setQty(e.target.value) }
                    />
                    <select
                        name="languages"
                        onChange={onSelectCategory}
                        id="lang"
                        className="select input-form-area mt-3 px-2 ">
                        <option value="0">التصنيف الرئيسي</option>
                        {
                            category.data ? (
                                category.data.map((item)=>{
                                    return  <option  key={item._id}  value={item._id}>{item.name}</option>
                                })
                            ) : null
                        }
                    </select>

                    <Multiselect
                        className="mt-2 text-end"
                        placeholder="التصنيف الفرعي"
                        options={options}
                        onSelect={onSelect}
                        onRemove={onRemove}
                        displayValue="name"
                    />
                    <select
                        name="brand"
                        //id="brand"
                        onChange={onSelectBrand}
                        className="select input-form-area mt-3 px-2 ">
                        <option value="val">الماركة</option>
                        {
                            brand.data ? (
                                brand.data.map((item)=>{
                                    return  <option  key={item._id}  value={item._id}>{item.name}</option>
                                })
                            ) : null
                        }
                    </select>
                    <div className="text-form mt-3 "> الالوان المتاحه للمنتج</div>
                    <div className="mt-1 d-flex">
                        {
                            colors.length >= 1  ? (
                                colors.map( (item, index)=>{
                                    return  <div className="color ms-2 border  mt-1"  onClick={() => removeColor(item)}  key={index} style={{ backgroundColor: item }}></div>
                                })
                            ) : null
                        }

                        <img onClick={()=> onChangeColor( !showColor )} src={add} alt="" width="30px" height="35px" style={{ cursor: "pointer" , marginRight: '4px'}} />
                        
                        {
                            showColor === true ? <CompactPicker  onChangeComplete={handelChangeComplete}/> : null
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                <Col sm="8" className="d-flex justify-content-end ">
                    <button className="btn-save d-inline mt-2"  onClick={handelSubmit}>حفظ التعديلات</button>
                </Col>
            </Row>
        </div>
    )
}

export default AdminAddProducts;