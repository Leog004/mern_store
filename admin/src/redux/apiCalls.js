import { publicRequest, UserRequest } from "../requestMethod";
import { deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess } from "./ProductRedux";
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

    dispatch(deleteProductStart);

    try{

        const res = await UserRequest.delete(`/products/${id}`);

        dispatch(deleteProductSuccess(id));

    }catch(err){
        dispatch(deleteProductFailure());
    }
}