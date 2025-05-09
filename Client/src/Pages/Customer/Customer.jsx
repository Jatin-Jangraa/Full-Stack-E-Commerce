import React, { useState ,useEffect} from 'react'
import "./Customer.css"
import { customer_data, product_data } from '../../assets/Data/data'
import { MdDeleteOutline } from "react-icons/md";
import { usersapi } from '../../api';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Sidebar from '../../components/Side/Sidebar';


const Customer=()=>{

const [userdata , setuserdata ]= useState(null);
const {user,userid} = useSelector((state)=>state.counter)

const userdataapi = async()=>{

  try {
    
    const res = await usersapi.get(`/all/?id=${userid}`)

    setuserdata(res.data.userres)


  } catch (error) {
    console.log(error);
    
  }



}



useEffect(() => {
 userdataapi()

  
}, [])



  return(
    <>
    <div className="customer" >
<div className="customerside"><Sidebar/></div>
<div className="customermain">
  <div className='customerheading'><h1>Customer</h1></div>




  <div className="customerdata">


  
    <div className='name'><p>Name</p></div>
    <div className='mail'> <p>E-Mail</p></div>
    <div className='gender'><p>Gender</p></div>
    <div className='role'><p>Role</p> </div>
    <div className="action"><p>Action</p></div>
  </div>


  {userdata?userdata.map((dta)=>{
  return(
  <div className="customerdata">


    <div className='name'><p>{dta.name}</p></div>
    <div className='mail'> <p>{dta.email}</p></div>
    <div className='gender'><p>{dta.gender}</p></div>
    <div className='role'><p>{dta.role}</p> </div>
    <div className="action"><div><button onClick={
      async()=>{
const confirm = window.confirm("Are you Sure to delete User Permanently?")

      if(confirm)try {
        
        const res = await usersapi.delete(`/delete/${dta._id}`)

        toast.success("User Deleted Successfully")

 userdataapi()
      } catch (error) {
        console.log(error);
        toast.error("Failed to Delete User")
      }




    }}>< MdDeleteOutline /></button></div></div>
  </div>
 )
}):null} 






</div>



    </div>
    </>
  )
}

export default Customer



    
