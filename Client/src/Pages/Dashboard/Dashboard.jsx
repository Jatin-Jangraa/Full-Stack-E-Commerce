import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Sidebar from "../../components/Side/Sidebar";

import PieChartComponent, { Cricket } from "../../Components/Chart/Charts/Chart";
import TableComponent from "../../Components/Table/Table";
import { statapi } from "../../api";

import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";

const Dashboard = () => {


  const [mydata, setmydata] = useState(null)
  console.log(mydata);


  const statdata = async () => {


    try {

      const res = await statapi.get("stats")

      if (res) {
        setmydata(res.data)
      }


    } catch (error) {

    }

  }



  useEffect(() => {
    statdata()
  }, [])


  const Widget = ({ heading, amount, percent, circle, color }) => {
    return (
      <>
        <div className="item">
          <div className="left-item">
            <p className="heading">{heading}</p>
            <div className="amount">
              <p>{amount}</p>
            </div>

            {percent > 0 ? (
              <div className="percent">
                <p className="color">
                  <FaArrowTrendUp />
                </p>
                <p className="color">{percent}%</p>
              </div>
            ) : (
              <div className="percent">
                <p className="red">
                  <FaArrowTrendDown />
                </p>
                <p className="red">{percent}%</p>
              </div>
            )}
          </div>

          <div className="right-item">
            {percent > 0 ? (
              <div
                className="outer"
                style={{
                  background: `conic-gradient(
                  ${color} ${(Math.abs(percent) / 100) * 360}deg,
                  rgb(255,255,255)0

                )`,
                }}
              >
                <div className="graph">{percent}%</div>
              </div>
            ) : (
              <div className="outer">
                <div className="graph">
                  <p>{percent}%</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  const Category = ({ heading, amount, color }) => {



    return (
      <>
        <div className="lap">
          <div>
            <p>{heading}</p>
          </div>
          <div className="lapp">
            <div
              style={{
                width: `${amount}%`,
                backgroundColor: color,
              }}
            ></div>
          </div>
          <div>
            <p>{amount}%</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="main">
        <Sidebar />

        <div className="data">



          <div className="stats-container">
            <div className="items">


              {mydata ?

                <Widget


                  heading={mydata.stats.count.revenue.name}
                  amount={mydata.stats.count.revenue.amount}
                  percent={(mydata.stats.changePercent.revenue).toString().slice(0, 3)}
                  color={`hwb(${(mydata.stats.changePercent.revenue.toString().slice(0, 3) * 71)} 41% 3%)`}
                /> : ""}
            </div>


            <div className="items">



              {mydata ?

                <Widget


                  heading={mydata.stats.count.user.name}
                  amount={mydata.stats.count.user.amount}
                  percent={(mydata.stats.changePercent.user).toString().slice(0, 3)}
                  color={`hwb(${(mydata.stats.changePercent.user.toString().slice(0, 3) * 35)} 41% 3%)`}
                /> : ""}
            </div>
            <div className="items">

              {mydata ?

                <Widget


                  heading={mydata.stats.count.transaction.name}
                  amount={mydata.stats.count.transaction.amount}
                  percent={(mydata.stats.changePercent.order).toString().slice(0, 3)}
                  color={`hwb(${(mydata.stats.changePercent.order.toString().slice(0, 3) * 4)} 41% 3%)`}
                /> : ""}


            </div>
            <div className="items">



              {mydata ?

                <Widget


                  heading={mydata.stats.count.product.name}
                  amount={mydata.stats.count.product.amount}
                  percent={(mydata.stats.changePercent.product).toString().slice(0, 3)}
                  color={`hwb(${(mydata.stats.changePercent.product.toString().slice(0, 3) * 20)} 41% 3%)`}
                /> : ""}
            </div>
          </div>

          <div className="graph-section">
            <div className="revenue-chart">
              <Cricket />
            </div>

            <div className="dash-cate">
              <div>
                <h2>Inventory</h2>
              </div>
              <div className="flow">

                {mydata ? mydata.stats.categoryCount.map((itm) => {
                  return (
                    <Category
                      heading={`${itm.name}`}
                      color={`hwb(${itm.number} 41% 3%)`}
                      amount={`${itm.number}`}




                    />
                  )
                })
                  : ""}



              </div>
            </div>
          </div>

          <div className="transaction">



            <div className="male" style={{ textAlign: "center", backgroundColor: "white", borderRadius: "20px", }}>
              <h2><div>Gender Ratio</div></h2>
              <PieChartComponent />
            </div>
            <div className="table">
              <TableComponent mydata={mydata} />
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
