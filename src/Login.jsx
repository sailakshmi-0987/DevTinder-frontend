import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from './utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from './utils/constants';

const Login = () => {
  const [email,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] =useState("");
  const [isLoginForm,setIsLoginForm] = useState(true);
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () =>{
    try{
      const res = await axios.post(
        BASE_URL+"/login",
      {
        email,
        password,
      },
      {withCredentials:true}
    );
    Dispatch(addUser(res.data));
    return navigate("/");
    }catch(err){
      setError(err?.response?.data || "Something went wrong!!");
      
    }
  }
  const handleSignUp = async()=>{
    try{
      const res = await axios.post(BASE_URL+"/signup",{firstName,lastName,email,password},{withCredentials:true});
      Dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    }catch(err){
      setError(err?.response?.data || "Something went wrong!!");
    }
  }
  return (
    <div class="flex justify-center my-14">
      <div class="card bg-neutral text-neutral-content w-96 m-4">
  <div class="card-body items-center text-center">
    <h2 class="card-title">{isLoginForm?"Login":"Sign Up"}</h2>
     {!isLoginForm &&( 
      <>
      <div>
      <fieldset class="fieldset py-4">
      <legend class="fieldset-legend text-base-100">First Name:</legend>
      <input type="text" 
      class="input text-neutral" 
      value={firstName} 
      onChange={(e)=>setFirstName(e.target.value)} 
      />
      </fieldset>
    </div>
      <div>
      <fieldset class="fieldset py-4">
      <legend class="fieldset-legend text-base-100">Last Name:</legend>
      <input type="text" 
      class="input text-neutral" 
      value={lastName} 
      onChange={(e)=>setLastName(e.target.value)} 
      />
      </fieldset>
    </div>
    </>
     )}
    <div>
      <fieldset class="fieldset py-4">
      <legend class="fieldset-legend text-base-100">Email ID:</legend>
      <input type="text" 
      class="input text-neutral" 
      value={email} 
      onChange={(e)=>setEmailId(e.target.value)} 
      />
      </fieldset>
    </div>
    <div>
      <fieldset class="fieldset py-4">
      <legend class="fieldset-legend text-base-100">Password:</legend>
      <input type="text" 
      class="input text-neutral" 
      value={password} 
      onChange={(e)=>setPassword(e.target.value)} 
      />
      </fieldset>
    </div>
    <p className="text-red-500">{error}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" onClick={isLoginForm?handleLogin:handleSignUp}>{isLoginForm?"Login":"Sign Up"}</button>   
    </div>
    <p className="m-auto pointer py-2" onClick={()=>setIsLoginForm((value)=>!value)}>
      {isLoginForm?"New User? Signup here":"Existing User? Login Here"}
    </p>
  </div>
</div>
    </div>
  )
}

export default Login
