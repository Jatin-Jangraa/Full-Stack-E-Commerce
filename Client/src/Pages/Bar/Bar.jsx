import React, { useEffect, useState } from 'react'
import "./bar.css"
import Sidebar from '../../components/Side/Sidebar'
import BarChart from '../../Components/Chart/Bar/Bary.jsx'
import { statapi } from '../../api'


const Bar = () => {

  const [apidata, setapidata] = useState({
    months: "",
    users: "",
    orders: "",
    products: "",
  })
  console.log(apidata);



  const fetching = async () => {

    try {

      const res = await statapi.get("/bar")


      if (res) {
        setapidata({
          months: res.data.charts.months,
          users: res.data.charts.users,
          orders: res.data.charts.orders,
          products: res.data.charts.products,
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
      <div className="main">
        <Sidebar />
        <div className="contain barcharty">
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><h2 style={{ color: "black" }}>Users</h2><div className='boxy'><BarChart labels={apidata.months} apidata={apidata.users} /></div></div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><h2 style={{ color: "black" }}>Products</h2><div className='boxy'><BarChart labels={apidata.months} apidata={apidata.products} /></div></div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}><h2 style={{ color: "black" }}>Orders</h2><div className='boxy'><BarChart labels={apidata.months} apidata={apidata.orders} /></div></div>


        </div>
      </div>
    </>
  )
}

export default Bar