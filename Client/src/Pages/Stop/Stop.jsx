import React, { useEffect, useState } from 'react'
import Sidebar from '../../Components/Side/Sidebar';
import "./stop.css"
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;


  const hoursstring = hours.toString().padStart(2, "0");
  const minutesstring = minutes.toString().padStart(2, "0");
  const secondsstring = seconds.toString().padStart(2, "0");


  return (
    `${hoursstring}:${minutesstring}:${secondsstring}`
  )
}


const Stop = () => {

  const [time, settime] = useState(0)
  const [isrun, setisrun] = useState(false)

  const Resethandler = () => {
    settime(0);
    setisrun(false);
  }


  useEffect(() => {


    let intervalid;


    if (isrun) {

      intervalid = setInterval(() => {
        settime((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      clearInterval(intervalid)

    }

  }, [isrun])


  return (
    <>
      <div className="stopmmainn">
        <div className="stopside">
          <Sidebar />
        </div>

        <div className="stopmain">


          <div style={{ height: "92vh", backgroundColor: "white", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }} className="contain barcharty">


            <div className='stophead'><h2>Stop Watch</h2></div>



            <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", alignItems: "center", width: "40vw", flexDirection: "column" }}>

              <div className='stoptime'><h2>{formatTime(time)}</h2></div>
              <div style={{ display: "flex", marginTop: "30px", justifyContent: "space-around", width: "40%" }}>
                <div style={{}}><button onClick={() => setisrun((prev) => !prev)} style={{ minWidth: "85px", fontWeight: "600", border: "1.2px solid black", borderRadius: "10px", backgroundColor: "rgb(16, 101, 237)", padding: "5px 20px" }}>{isrun ? "Stop" : "Start"}</button></div>
                <div style={{}}><button onClick={Resethandler} style={{ fontWeight: "600", border: "1.2px solid black", borderRadius: "10px", backgroundColor: "red", padding: "5px 20px" }}>Reset</button></div>
              </div>



            </div>




          </div></div>
      </div>
    </>
  )
}

export default Stop