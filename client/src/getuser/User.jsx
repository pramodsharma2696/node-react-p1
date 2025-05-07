import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

export const User = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async() =>{
            try {
                const response = await axios.get("http://localhost:8000/api/user");
                setUsers(response.data.data);
            } catch (error) {
                console.log("Error while fetching data: ", error);
                
            }
        }
        fetchData();
    },[])

    const deleteuser = async(id) =>{
        await axios.delete(`http://localhost:8000/api/user/${id}`)
        .then((response) =>{
            setUsers((prevuser) => prevuser.filter((user) => user._id !== id))
            toast.success(response.data.message, {position:"top-right"});
            navigate("/");
        })
        .catch((error) =>{
            console.log(error);
        })
    }
    return (
        <>
            <div className='container py-5 userTable'>
                <Link to='/adduser' className='btn btn-primary btn-sm float-end mb-3'><i className="fas fa-plus"></i> Add More</Link>
                {users.length === 0 ? (
                    <div className='noData'>
                        <h3>No Data to display</h3>
                        <p>Please add new users</p>
                    </div>
                ):(
                    <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map((user, index) =>{
                            return(
                        <tr>
                            <td>{ index + 1}</td>
                            <td>{ user.name }</td>
                            <td>{ user.email }</td>
                            <td>{ user.address }</td>
                            <td>
                                <Link to={`/updateuser/`+ user._id} className='btn btn-primary btn-sm'>Edit</Link>
                                <button onClick={() => deleteuser(user._id)} type='buttton' className='btn btn-danger btn-sm ms-2'>Delete</button>
                            </td>
                        </tr>
                            )
                        })}
                        
                    </tbody>
                </table>
                )}
                
            </div>
        </>
    )
}
