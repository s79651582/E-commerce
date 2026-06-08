import { GET_ALL_PRODUCT, GET_PRODUCT_DETALIS, GET_PRODUCT_SIMILAR, GET_ERROR, CREATE_PRODUCT, DELETE_PRODUCT } from '../type'

const inital = {
    product: [],
    allProductsArray: [],
    oneProduct: [],
    ProductSimilar: [],
    deleteProduct: [],
    loading: true,
}
const productReducer = (state = inital, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCT:
            return {
                ...state,
                allProductsArray: action.payload,
                loading: false
            }
        case GET_PRODUCT_SIMILAR:
            return {
                ...state,
                ProductSimilar: action.payload,
                loading: false
            }
        case GET_PRODUCT_DETALIS:
            return {
                oneProduct: action.payload,
                loading: false
            }
        case CREATE_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                deleteProduct: action.payload,
                loading: false
            }
        case GET_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                /*loading: true,
                product: action.payload,*/
            }
        default:
            return state;
    }
}
export default productReducer;