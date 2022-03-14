import { publicRequest, UserRequest } from "../requestMethod";
import { AddProductFailure, AddProductStart, AddProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, UpdateProductFailure, UpdateProductStart, UpdateProductSuccess } from "./ProductRedux";
import { loginFailure, loginStart, loginSuccess } from "./UserRedux"


export const login = async (dispatch, user) =>{
    dispatch(loginStart());

    try{

        const res = await publicRequest.post('/auth/login', user);

        dispatch(loginSuccess(res.data));

    }catch(err){
        dispatch(loginFailure());
    }
}



export const getProducts = async (dispatch) =>{

    dispatch(getProductStart());

    try{

        const res = await publicRequest.get('/products/');

        dispatch(getProductSuccess(res.data));

    }catch(err){
        dispatch(getProductFailure());
    }
}


export const deleteProduct = async (id, dispatch) =>{

    dispatch(deleteProductStart());

    try{

        const res = await UserRequest.delete(`/products/${id}`);

        dispatch(deleteProductSuccess(id));

    }catch(err){
        dispatch(deleteProductFailure());
    }
}


export const updateProduct = async (id, product, dispatch) => {
  dispatch(UpdateProductStart());
  try {
    // update
    dispatch(UpdateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(UpdateProductFailure());
  }
};


  export const addProduct = async (product, dispatch) => {
    dispatch(AddProductStart());
    try {
      const res = await UserRequest.post(`/products`, product);
      dispatch(AddProductSuccess(res.data));

    } catch (err) {
      dispatch(AddProductFailure());
    }
  };