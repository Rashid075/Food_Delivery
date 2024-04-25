import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
    const [credentials, setcredentials]=useState({name:"",email:"",password:"",geolocation:""})
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("https://food-delivery-server-one.vercel.app/api/createuser",{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email,password: credentials.password, location: credentials.geolocation})
        }) ;
        const json= await response.json()
        console.log(json)
        if(!json.success){
            alert('Enter Valid Credentials');
        }
    }
    const change=async(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div className='p-3 m-0 bg-success text-white'>
    <div className="container">
      <div className='text-center m-5'><h2>SignUP</h2></div>
      <form onSubmit={handleSubmit} className='col-md-4 d-block m-auto'>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" name='name' value={credentials.name} onChange={change} />
        </div>
        <div className="mb-3">
           <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
           <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email}onChange={change} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password
          </label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={change} />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Address</label>
          <input type="name" className="form-control" name='geolocation' value={credentials.geolocation} onChange={change} />
        </div>
        <button type="submit" className="m-3 btn btn-success">Submit</button>
        <Link to='/login' className="m-3 btn btn-danger">Already a User</Link>
      </form>
    </div>
    </div>
  );
}
