import {combineReducers} from 'redux'
import categoryReducer from './categoryReducer'
import brandReducer from './brandReducer'
import subCategoryReducer from './subCategoryReducer'
import productReducer from './productReducer'

export default combineReducers ({
    allCategory: categoryReducer ,
    allBrand: brandReducer ,
    allSubCategory: subCategoryReducer ,
    allProduct: productReducer
})