import React from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import "./table.css"


const TableComponent = ({mydata}) => {
  // Sample data
  const data =mydata?mydata.stats.latestTransaction
  :""
  console.log(data);
  
  // Define columns
  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Amount", accessorKey: "amount" },
    { header: "Discount", accessorKey: "discount" },
    { header: "Status", accessorKey: "status" },
  ];

 
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (<><div style={{display:"flex",flexDirection:"column" , justifyContent:"center",alignItems:"center",height:"100%",width:"100%"}}>
  <div style={{
    margin:"0px 20px 10px 0px",fontWeight:"700",fontSize:"25px"
  }}>Table</div>
    <table border="1"  style={{  border:".8px solid black", width: "90%",height:"80%", textAlign: "center", borderCollapse: "collapse" }}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} >
            {headerGroup.headers.map((column) => (
              <th   style={{border:".8px solid black"}} key={column.id}>{flexRender(column.column.columnDef.header, column.getContext())}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr  style={{border:".8px solid black"}} key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="cell" style={{border:".8px solid black"}} key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table></div>
    </> );
};

export default TableComponent;