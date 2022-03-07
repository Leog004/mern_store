import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {

            const newItem = action.payload;

            const existingItem = state.products.find((item) => item._id === newItem._id);

            if(existingItem){
                
                existingItem.quantity += action.payload.quantity;
                existingItem.total += action.payload.price * action.payload.quantity;
                
                state.total = 0;

                state.products.map((el) => {
                    return state.total += el.quantity * el.price;
                })

            }else{

                state.quantity += 1;
                state.products.push(action.payload);
                
                state.total = 0;
                state.products.map((el) => {
                    return state.total += el.quantity * el.price;
                })
            }
        },
        clearProducts: (state) => {
            state.quantity = 0;
            state.products = [];
            state.total = 0;
        },
        increment: (state, action) => {
            
            const productToUpdate = state.products.find((item) => item._id === action.payload._id);

            productToUpdate.quantity += 1;

            state.total = 0;

            state.products.map((el) => {
                return state.total += el.quantity * el.price;
            })

        },
        decriment: (state, action) => {

            const productToUpdate = state.products.find((item) => item._id === action.payload._id);

            if(productToUpdate.quantity === 1){
                state.products = state.products.filter((item) => item._id !== action.payload._id)
                state.quantity -= 1;
            }else{
                productToUpdate.quantity -= 1;
            }

            
            state.total = 0;
            
            if(state.products.length > 0){
                state.products.map((el) => {
                    return state.total += el.quantity * el.price;
                })
            }
        }
    }
});


export const {addProduct, clearProducts, increment, decriment} = cartSlice.actions;
export default cartSlice.reducer;