import { useDispatch, useSelector } from 'react-redux'
import { getAllCategory } from '../../redux/actions/categoryAction';
import { getAllBrand } from '../../redux/actions/brandAction';
import { getSubcategories } from '../../redux/actions/subCategoryAction';
import notify from '../../hook/useNotifaction';


const AddProductsHook = ()=>{
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

    // get last brand state from redux
    const brand = useSelector(state => state.allBrand.brand);
    /*if(brand){
        console.log(brand.data)
    }*/

    // get last subCategory state from redux
    const subCategory = useSelector(state => state.allSubCategory.subCategory);

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
}

export default AddProductsHook;