import {createSlice} from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    }, 
    reducers: {
        // GET ALL
        getProductStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products = action.payload;
        },
        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // DELETE
        deleteProductStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload),
                1
            );
        },
        deleteProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // UPDATE
        UpdateProductStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products[state.products.findIndex((item) => item._id === action.payload.id)] = action.payload.product;
          },
        UpdateProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },


        // ADD
        AddProductStart:(state) => {
            state.isFetching = true;
            state.error = false;
        },
        AddProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products.push(action.payload) 
            state.error = false;
        },
        AddProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        }
    }
});

export const {
    getProductFailure,getProductStart, getProductSuccess, 
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    UpdateProductStart, UpdateProductSuccess, UpdateProductFailure,
    AddProductStart, AddProductSuccess, AddProductFailure
} = productSlice.actions;

export default productSlice.reducer;