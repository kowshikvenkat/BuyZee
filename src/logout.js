import React, { Component } from 'react';
import { deleteUser, getAuth,} from "firebase/auth";
import {app,createUserDocument,login} from './firebase';
import { useNavigate,useLocation } from 'react-router-dom';
export default function Logout(){
    const navigate = useNavigate()
    const location = useLocation()
        const auth = getAuth(app);
        const [ cartdatas,setcartdatas] = React.useState([])
        React.useEffect(()=>{
         setcartdatas(location.state.data)
        })
        const logout = async()=>{
     const user = auth.currentUser;
     await deleteUser(user)
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('firstname')
    sessionStorage.removeItem('mobile')
navigate('/',{state:{data:cartdatas}})
  }
    return(
        <div className='text-center d-flex flex-column justify-content-center align-items-center ' style={{marginTop:"10%"}}>
        <div className='alert alert-success w-50'>
            You have already logged In , &nbsp; <b>{sessionStorage.getItem('email')}</b>
        </div>
  <div className='d-flex  w-25 justify-content-evenly'>
    <button className='btn btn-success' onClick={()=>navigate('/',{state:{data:cartdatas}})}>Stay Logged  In</button>
    <button className='btn btn-danger' onClick={logout}>Logout</button>
  </div>
        </div>
    )
}