import axios from  'axios';
import {loginStart, loginSuccess, loginFailure, logout} from './userReducer'

export const login = async(dispatch , user)=>{
    dispatch(loginStart());
    try{
        const res= await axios.post('http://localhost:5000/api/auth/login',user)
        // console.log(res.data)
        dispatch(loginSuccess(res.data))        
    }catch(err){
       dispatch(loginFailure())
    } 
}

export const verifyEmail = async (dispatch , user)=>{
    dispatch(loginStart());
    try{
         const res = await axios.post('http://localhost:5000/api/auth/verify/user',user)
         console.log(user)
         dispatch(loginSuccess(res.data))
    }catch(err){
         dispatch(loginFailure())
    }
}

export const signup = async (dispatch , user)=>{
    dispatch(loginStart());
    try{
         const res = await axios.post('http://localhost:5000/api/auth/create/user',user)
         dispatch(loginSuccess(res.data))
    }catch(err){
        console.log(err)
         dispatch(loginFailure())
    }
}

