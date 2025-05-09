import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Side/Sidebar'
import "./pie.css"
import { statapi } from '../../api'
import PieComponent from '../../Components/Chart/Pie/Pie'



const Pie = () => {

  const [apidata, setapidata] = useState({
    orderdata: "",
    productdata: "",
    stock: "",
    revenue: "",
  })
  console.log(apidata);



  const fetching = async () => {

    try {

      const res = await statapi.get("/pie")


      if (res) {
        setapidata({
          orderdata: res.data.charts.orderFullfillment,
          productdata: res.data.charts.productCategories,
          stock: res.data.charts.stockAvailablity,
          revenue: res.data.charts.revenueDistribution,
        })

      }


    } catch (error) {

    }


  }



  useEffect(() => {
    fetching()
  }, [])



  return (
    <>
      <div className='pcharty'>
        <div className="main">
          <Sidebar />
          <div className="contain barcharty">

            <div style={{ marginBottom: "70px" }}> <h2 style={{ width: "100%", display: "flex", justifyContent: "center" }}>Order Summery </h2><div className='boxy'><div ><PieComponent apidata={apidata.orderdata} /></div></div></div>
            <div style={{ marginBottom: "70px" }}> <h2 style={{ width: "100%", display: "flex", justifyContent: "center" }}>Order Summery </h2><div className='boxy'><div ><PieComponent apidata={apidata.productdata} /></div></div></div>
            <div style={{ marginBottom: "70px" }}> <h2 style={{ width: "100%", display: "flex", justifyContent: "center" }}>Revenue Distribution </h2><div className='boxy'><div ><PieComponent apidata={apidata.revenue} /></div></div></div>
            <div style={{ marginBottom: "70px" }}> <h2 style={{ width: "100%", display: "flex", justifyContent: "center" }}>Stock Summery </h2><div className='boxy'><div ><PieComponent apidata={apidata.stock} /></div></div></div>

          </div>
        </div></div>
    </>
  )
}

export default Pie