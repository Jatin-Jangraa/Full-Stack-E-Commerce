import React, { useState } from 'react'
import "./sidebar.css"
import { MdDashboard } from "react-icons/md";
import { FcCustomerSupport } from "react-icons/fc";
import { AiOutlineProduct } from "react-icons/ai";
import { GrTransaction } from "react-icons/gr";
import { IoBarChart } from "react-icons/io5";
import { FaChartPie } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaStopwatch } from "react-icons/fa6";
import { FaBitcoin } from "react-icons/fa";
                import { IoTicketOutline } from "react-icons/io5";



import { Link, useLocation } from 'react-router-dom';


const Sidebar = () => {

  const location=useLocation()




  return (
    <>
          <div className="sidebar">
            <div className="logo">
              <h3>Logo.</h3>
            </div>
            <div className="dash">
              <p>Dahboard</p>
            </div>
            <div className="link">
            

            <Link to={"/admin/dashboard"}>
                <div
                  className={`${location.pathname.includes("/admin/dashboard")?"box":""}`}
                 
                >
                  <div className="aa">
                    <span className='span'>
                      <MdDashboard />
                    </span>
                    <p>Dasboard</p>
                  </div>
                </div>
                </Link>
    
                <Link to={"/admin/customer"}>
                <div
                  className={`${location.pathname.includes("/admin/customer")?"box":""}`}
               
                >
                  <p className="aa">
                    <span className='span'>
                      <FcCustomerSupport />
                    </span>{" "}
                    Customer
                  </p>
                </div>
                </Link>
              
    
                <Link to={"/admin/product"}>
                <div
                  className={`${location.pathname.includes("/admin/product")?"box":""}`}
                 
                >
                  <p className="aa">
                    <span className='span'>
                      <AiOutlineProduct />
                    </span>
                    Product
                  </p>
                </div>
                </Link>
    
                <Link to={"/admin/transaction"}>
                <div
                  className={`${location.pathname.includes("/admin/transaction")?"box":""}`}
                 
                >
                  <p className="aa">
                    <span className='span'>
                      <GrTransaction />
                    </span>{" "}
                    Transaction
                  </p>
                </div>
                </Link>
            </div>

            <div className="chart"><div className="dash">
              <p>Charts</p>
            </div>
            <div className="link">
            

            <Link to={"/admin/chart/bar"} style={{border:"none", outline:"none"}}>
                <div
                  className={`${location.pathname.includes("/admin/chart/bar")?"box":""}`}
                 
                >
                  <div className="aa">
                    <span className='span'>
                      <IoBarChart />
                    </span>
                    <p>Bar</p>
                  </div>
                </div>
                </Link>
    
                <Link to={"/admin/chart/pie"}>
                <div
                  className={`${location.pathname.includes("/admin/chart/pie")?"box":""}`}
               
                >
                  <p className="aa">
                    <span className='span'>
                      <FaChartPie />
                    </span>{" "}
                    Pie
                  </p>
                </div>
                </Link>
              
    
               
    
               
            </div></div>



            <div className="chart"><div className="dash">
              <p>Apps</p>
            </div>
            <div className="link">
            

            <Link to={"/admin/app/stopwatch"}>
                <div
                  className={`${location.pathname.includes("/admin/app/stopwatch")?"box":""}`}
                 
                >
                  <div className="aa">
                    <span className='span'>
                      <FaStopwatch />
                    </span>
                    <p>Stopwatch</p>
                  </div>
                </div>
                </Link>
    
                <Link to={"/admin/app/coupan"}>
                <div
                  className={`${location.pathname.includes("/admin/app/coupan")?"box":""}`}
               
                >
                  <p className="aa">
                    <span className='span'>
                      <IoTicketOutline />
                    </span>
                    Coupan
                    
                  </p>
                </div>
                </Link>
              
    
                <Link to={"/admin/app/toss"}>
                <div
                  className={`${location.pathname.includes("/admin/app/toss")?"box":""}`}
                 
                >
                  <p className="aa">
                    <span className='span'>
                      <FaBitcoin />
                    </span>
                    Toss
                  </p>
                </div>
                </Link>
                
            </div></div>
          </div>
        </>
  )
}

export default Sidebar