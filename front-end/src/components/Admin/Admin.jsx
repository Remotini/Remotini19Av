import {React , useEffect,useState} from 'react'
import axios from 'axios'
import './Admin.css'
import { MdDelete,MdEdit } from "react-icons/md";
function Admin() {
    const [users,setUsers]=useState([])
    const [filter,setFilter]=useState('default')
    const [loading,setLoading]=useState(false)
    useEffect(()=>{
        
        const fetchUsers=async()=>{
            setLoading(true)
        axios.get('http://localhost:5001/api/user')
        .then((res)=>{
            setUsers(res.data)
            setLoading(false)
        }).catch((err)=>{
            console.log(err)

        })
        }
        fetchUsers();
    },[])
    const handleDeleteUser=()=>{ 
        axios.delete("http://localhost:5001/removeUser") //ask medi 
    }
    const filteredUser=users.filter(user=>{
        if (filter === 'default'){
            return true}
        return user.role === filter;
    })
    console.log("filteredUser",filteredUser)
  return (

    <div className="Adminwrapper">
        <h1 className='titleAdmin' >Admin Page</h1>
        {loading && <h1>Loading...</h1>}
        <div className="AdminTablewrapp">
       
             <table className='adminTable' >
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                             <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUser.map((user)=>(
                                <tr key={user._id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td className='email_icons' >{user.email} 
                                    </td>
                                    <td className='middle' ><span className='iconsAdmin'>
                                        <MdDelete onClick={()=>handleDeleteUser} />
                                        <MdEdit /></span> </td>
                                     
                                </tr>
                            
                            ))
                        }
                    </tbody>
                
            </table>
            <div className='selRole'>
              <select name="" id="" onChange={e=>setFilter(e.target.value)}>
                    <option value="default">default...</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Chef">Chef</option>
                </select>  
            </div>
            
        </div>
         <div className="adduser">
            <h1>Add User</h1>
            <form className='adduserform'>
                <input type='text' placeholder='First Name' />
                <input type='text' placeholder='Last Name' />
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button type='submit'>Add User</button>
            </form>
         </div>
    </div>
  )
}

export default Admin
