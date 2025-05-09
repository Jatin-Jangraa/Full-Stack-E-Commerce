import React, { useEffect, useState } from 'react'
import "../../Style/Orders.scss"
import { transactionapi } from '../../api'
import { useSelector } from 'react-redux'


const Orders = () => {

  const { user, userid } = useSelector((state) => state.counter)

  const [data, setdata] = useState([])
  const [id, setid] = useState(userid)
  console.log(data);

  const apidata = async () => {


    const res = await transactionapi.get(`/my`, { params: { id: id } })

    if (res)
      // console.log(res.data);
      setTimeout(() => {
        setdata(res.data)

      }, 200);


  }


  useEffect(() => {
    apidata()
    setid(userid)
    console.log(userid);



  }, [])



  return (
    <div className="order">
      <h1 className='ordershead'>My Orders</h1>
      <div className="orderbox">
        <h1 className='ordersboxhead'>Orders</h1>

        <div className="ordersitem ordery">
          <div className="ordersid">Order Date</div>
          <div className="ordersquantity">Product</div>
          <div className="ordersdiscount">Discount</div>
          <div className="ordersamount">Amount</div>
          <div className="ordersstatus">Status</div>

        </div>

        {data ? data.map((itm) => {
          return (
            <div className="ordersitem">

              <div className="ordersid">{new Date(itm.createdAt).toLocaleDateString("en-US", {


                month: 'long', year: 'numeric',
                day: "numeric",
              })}</div>
              <div className="ordersquantity">{itm.orderitems.length}</div>
              <div className="ordersdiscount">{itm.discount}</div>
              <div className="ordersamount">{itm.total}</div>
              <div className={`ordersstatus ${itm.status === "Processing" ? "yellow" : ""} ${itm.status === "Delivered" ? "green" : ""} ${itm.status === "Shipped" ? "blue" : ""}`}>{itm.status}</div>

            </div>
          )
        })



          : ""}




      </div>
    </div>
  )
}

export default Orders