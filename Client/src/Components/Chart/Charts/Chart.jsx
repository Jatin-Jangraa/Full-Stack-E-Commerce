import { CartesianGrid, Legend, ResponsiveContainer, Tooltip } from "recharts";
import "./chart.css"
import { LineChart, Line, XAxis, YAxis } from "recharts";





export function Cricket() {

  const [apidata,setapidata]= useState("")

  

  const datafromapi = async ()=>{

    const res = await statapi.get("/stats")

    if(res){
      setapidata(res.data.stats.chart)
     

      
    }

  }


  useEffect(() => {
   datafromapi()
  }, [])
  


let record = []

  

{apidata?apidata.map((itm)=>{
  
record.push(itm)
  
}):""}
  


  return (
    <div style={{
        display:"flex",flexDirection:"column",
    }}>
        <div >
                <h1 style={{
                    marginBottom:"20px"
                }}>Revenue &Transaction</h1>
              </div>
              <ResponsiveContainer width="100%" height={265}>

      <LineChart data={record}  className="line">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx={3} dy={3} stdDeviation={3} floodColor="rgba(0,0,0,0.3)"/>

          

          </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="year"></XAxis>
        <YAxis  ></YAxis>
        <Line dataKey="Orders" />
        <Line type={"bump"} dataKey="Revenue"  stroke="#cd0000"/>
        
        <Legend/>
        <Tooltip/>
      </LineChart></ResponsiveContainer><div style={{fontSize:"1.2rem",fontWeight:"550"}}>Revenue in 1000</div>
    </div>
  );
}






import { PieChart, Pie, Cell, } from "recharts";
import { useEffect, useState } from "react";
import {  statapi } from "../../../api";








const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"];

const PieChartComponent = () => {

  const[userapi,setuserapi ]= useState(null)


  const datafromap = async ()=>{


    const res = await statapi.get("/stats")

    if(res){
     
     

      setuserapi(res.data.stats.userRatio)
    }

  }


  useEffect(() => {
   datafromap()
  }, [])


 let data = [  
  { name: "Male", value:userapi?userapi.male:1},
  { name: "Female", value: userapi?userapi.female:1},
 
];



  return (<>
    <ResponsiveContainer width="100%" height={280}>
    <PieChart >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={110}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart></ResponsiveContainer></>
  );
};

export default PieChartComponent;






