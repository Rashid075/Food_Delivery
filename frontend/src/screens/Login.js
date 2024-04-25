import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate=useNavigate();
  const [credentials, setcredentials]=useState({email:"",password:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("https://food-delivery-server-one.vercel.app/api/loginuser",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ email:credentials.email,password: credentials.password})
        }) ;
        const json= await response.json()
        console.log(json)
        if(!json.success){
            alert('Enter Valid Credentials');
        }
        if(json.success){
          localStorage.setItem('userEmail',credentials.email)
          localStorage.setItem('authToken',json.authToken)
          console.log(localStorage.getItem("authToken")) 
          navigate("/")
        }
    }
    const change=async(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div className='p-5  bg-success text-white'>
      <div className="container">
      <div className='text-center p-5 m-1 '><h2>Login</h2></div>
      <form onSubmit={handleSubmit} className='col-md-4 d-block m-auto p-5'>
        <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email}onChange={change} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password
          </label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={change} />
        </div>
        <button type="submit" className="m-3 btn btn-light">Submit</button>
        <Link to='/createuser' className="m-3 btn btn-danger">SignUp</Link>
      </form>
    </div>
    </div>
  )
}
