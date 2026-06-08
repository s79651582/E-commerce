import { GET_ALL_SUBCATEGORY, GET_ERROR, CREATE_SUBCATEGORY } from '../type'

const inital = {
    subCategory: [],
    loading: true,
}
const SubCategoryReducer = (state = inital, action) => {
    switch (action.type) {
        case GET_ALL_SUBCATEGORY:
            return {
                subCategory: action.payload,
                loading: false,
            }
        case CREATE_SUBCATEGORY:
            return {
                ...state,
                subCategory: action.payload,
                loading: false
            }
        case GET_ERROR:
            return {
                ...state,
                subCategory: null,
                loading: false,
                error: action.payload
                /*loading: true,
                category: action.payload,*/
            }
        default:
            return state;
    }
}
export default SubCategoryReducer;