import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export const UpdateUser = () => {
    const users = {
        name:"",
        email:"",
        address:""
    };

    const [user, setUser] = useState(users)
    const navigate = useNavigate();
    const { id } = useParams();
    const inputHandler = (e) => {
        const {name, value} = e.target;
        console.log(name, value);
        
        setUser({...user, [name]:value});
    }

    useEffect(() => {
        const fetchData = async() =>{
            try {
                const response = await axios.get(`http://localhost:8000/api/user/${id}`);
                setUser(response.data.data);
            } catch (error) {
                console.log("Error while fetching data: ", error);
                
            }
        }
        fetchData();
    },[id])

    const submitHandler = async(e) =>{
        e.preventDefault();
        await axios.put(`http://localhost:8000/api/user/${id}`, user)
        .then((response) =>{
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
                <h3>Update User</h3>
            <form action="#" method="post" onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" id="name" onChange={inputHandler} placeholder='enter name' className='form-control' value={user.name} />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input type="email" name="email" id="email" onChange={inputHandler} placeholder='enter email' className='form-control' value={user.email} />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Address</label>
                    <input type="text" name="address" id="address" onChange={inputHandler} placeholder='enter address' className='form-control' value={user.address} />
                </div>
                <div className="mb-3">
                   <button type="submit" className='btn btn-primary'>Update User</button>
                   <Link to='/' className='btn btn-primary ms-3'>Back</Link>
                </div>
            </form>
            </div>
        </div>
    </>
  )
}
