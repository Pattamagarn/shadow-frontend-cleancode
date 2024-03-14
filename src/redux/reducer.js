import { combineReducers } from 'redux'
import isLoginSlice from './isLoginSlice'
import productSlice from './productSlice'

const rootReducer = combineReducers({
    isLogin: isLoginSlice,
    product: productSlice
})

export default rootReducer