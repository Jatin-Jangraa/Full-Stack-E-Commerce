import React, { useState , useEffect } from 'react'
import "./Transaction.css"

import {transaction_data } from '../../assets/Data/data'
import { Link } from 'react-router-dom'
import Sidebar from '../../Components/Side/Sidebar'
import { transactionapi, usersapi } from '../../api'


const Transaction = () => {

const [orders,setorders] = useState(null);
const [name,setname] = useState("")
    const orderapi = async ()=>{

      const res = await transactionapi.get('/all')

      

      console.log(res.data);
      
      setorders(res.data)

    }


    useEffect(() => {
      orderapi()
    }, [])
    

  
  return (<>
    <div className="mmainn">
    <div className="transactionside">
      <Sidebar />
    </div>

    <div className="transactionmain">
      <div className="transactionheading">
        <h1>Transactions</h1>
      </div>

      <div className="transactiondata">
        <div className="transactionuser">
          <p>Customer Name</p>
        </div>
        <div className="transactionamount">
          <p>Amount</p>
        </div>
        <div className="transactiondiscount">
          <p>Discount</p>
        </div>
        <div className="transactionquantity">
         
          <p>Product</p>
        </div>
        <div className="transactionstatus">
          <p>Status</p>
        </div>
        <div className="transactionaction">
          <p>Action</p>
        </div>
       
      </div>

      {orders?orders.map((dta) => {
        return (
          <div className="transactiondata">
          <div className="transactionuser">
            <p>{dta.name}</p>
          </div>
          <div className="transactionamount">
            <p>{dta.total}</p>
          </div>
          <div className="transactiondiscount">
            <p>{dta.discount}</p>
          </div>
          <div className="transactionquantity">
           
            <p>{dta.orderitems.length}</p>
          </div>
          <div className="transactionstatus">
            <p className={` ${dta.status==="Processing"?"yellow":""} ${dta.status==="Delivered"?"green":""} ${dta.status==="Shipped"?"blue":""}`}>{dta.status}</p>
          </div>
          <div className="transactionaction">
          <Link to={`/admin/transaction/${dta._id}`}><div className='system'><p>Manage</p></div></Link>
          </div>
         
        </div>
        );
      }):null}
    </div>
  </div>
</>
  )
}

export default Transaction








