import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    product: { status: false }
}

const productSlice = createSlice({
    name: 'isLogin',
    initialState: initialState,
    reducers: {
        setProduct(state, action){
            console.log(action.payload)
            state.product = action.payload
        }
    }
})

const { actions, reducer } = productSlice
export const { setProduct } = actions
export default reducer