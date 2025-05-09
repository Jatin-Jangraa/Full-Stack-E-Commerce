import React, { useState } from 'react'
import Sidebar from '../../components/Side/Sidebar'
import "./toss.css"
import { assets } from '../../assets/Image/Assets'


const Toss = () => {

  const tos = `${assets.Coin}`
  const lap = `${assets.Coin1}`
  const [angle, setanle] = useState(tos)

  const Flipcoin = () => {


    let result = Math.random() < 0.5 ? (setanle(tos)) : (setanle(lap))
  }

  return (
    <>
      <div className="mmainn">
        <div className="transactionside">
          <Sidebar />
        </div>

        <div className="transactionmain">
          <div style={{ backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="contain barcharty">


            <div ><h2 style={{ fontWeight: "650" }}>Toss Coin</h2></div>



            <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", width: "40vw", flexDirection: "column" }}>


              <div onClick={Flipcoin} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }} className='jatin'><img src={angle} alt="" /></div>



            </div>



          </div>
        </div></div>
    </>
  )
}

export default Toss