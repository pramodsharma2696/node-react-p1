import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export const AddUser = () => {
    const users = {
        name:"",
        email:"",
        address:""
    };

    const [user, setUser] = useState(users)
    const navigate = useNavigate();
    const inputHandler = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        
        setUser({...user, [name]:value});
    }

    const submitHandler = async(e) =>{
        e.preventDefault();
        await axios.post("http://localhost:8000/api/user", user)
        .then((response) =>{
            console.log(response.data.message);
            toast.success(response.data.message, {position:"top-right"});
            navigate("/");
        })
        .catch((error) =>{
            console.log(error);
        })
    }

  return (
    <>
        <div className='container py-5'>
            <div className="col-6 offset-3">
                <h3>Add User</h3>
            <form action="#" method="post" onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" id="name" onChange={inputHandler} placeholder='enter name' className='form-control' />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="email" onChange={inputHandler} placeholder='enter email' className='form-control' />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Address</label>
                    <input type="text" name="address" id="address" onChange={inputHandler} placeholder='enter address' className='form-control' />
                </div>
                <div className="mb-3">
                   <button type="submit" className='btn btn-primary'>Add User</button>
                   <Link to='/' className='btn btn-primary ms-3'>Back</Link>
                </div>
            </form>
            </div>
        </div>
    </>
  )
}
