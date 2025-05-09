import React from 'react'


import "../../Style/Payment.scss"
import RazorpayButton from '../../Components/Amain/Payment'
import { useSelector } from 'react-redux'



const Payment = () => {


    const {total} = useSelector((state)=>state.order.orderdata)


  return (
    <div className='paymentbox'>
        <div className="paymentside">

        </div>

        <div className="payside">
            <p>{total}</p>
            <p>Amount</p>
            <button className='paymentButton'><RazorpayButton amount={total}/></button>
        </div>
    </div>
  )
}

export default Payment





