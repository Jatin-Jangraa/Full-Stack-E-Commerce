import React, { useEffect, useState } from "react";
import "./Tmanage.css";
import Sidebar from "../../../Components/Side/Sidebar";
import { orderitemdetail, product_data } from "../../../assets/Data/data";
import { transactionapi } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { MdDeleteOutline } from "react-icons/md";

const Pmanage = () => {

  const navigate = useNavigate()


  const [apidata,setapidata] = useState(null)

  console.log(apidata);
  
  const {id} = useParams()
console.log(id);


  const deleteorder = async()=>{
    try {
      
      const confirm = window.confirm("Are you Sure to delete Order Permanently?")
if(confirm){
      const res = await transactionapi.delete(`/delete/?id=${id}`)
    if(res){
      toast.success("order Deleted Successfully ")
      navigate("/admin/transaction")
    }

    }

    } catch (error) {
      
    }


  }

  const transactiondata = async()=>{

    const res = await transactionapi.get(`/singleorder/?id=${id}`)

    if(res){
    setapidata(res.data)
    
    
    }


  }


  const handleclick = async()=>{


    try {
      
      const res = await transactionapi.put(`/process/?id=${id}`)


      if(res){
        toast.success("Status Updated Successfully")
        transactiondata()
      }

    } catch (error) {
      
    }

  }



  useEffect(() => {
   transactiondata()
  }, [])
  

  const amphoto = product_data[0].image;



 
  return (
    <div className="tmanage">
      <div className="tmanageside">
        <Sidebar />
      </div>
      <div className="tmanagemain">

        <div className="tmanagebox">

          <p className="tmanagep">Order Items</p>

          {apidata?apidata.orderitems.map((itm)=>{
            return(
              <div className="tmanageimage">
            <img src={itm.image} alt="" />
            <div className="tmanageheading">
            <h1>{itm.name}</h1>
<h1>       
   Price  :{itm.price}
</h1>
<h1>       
   Quantity  :{itm.quantity}
</h1>
            </div>
</div>
            )
          }):""}

          
        </div>




        <div className="tmanageboxy">
<div className="tdelete">
<p className="tmanagep">Transaction Manage</p>
<button className="transactiondelete" onClick={deleteorder}><MdDeleteOutline/></button>
</div>


{apidata?<>
  <div className="tmanageuser">
  <p className="tmanagehead">User Info</p>
  <div className="tmanagedata">
   <div className=" tmanagediv"><p>Name:</p><p>{apidata.name}</p></div> 
    <div className=" tmanagediv"><p>Address:</p> <p>{apidata.shippinginfo.address}</p></div>
    <div className=" tmanagediv"><p>Address:</p> <p>{`${apidata.shippinginfo.city},${apidata.shippinginfo.state}`}</p></div>



  </div>

</div>


<div className="tmanageuser">
  <p className="tmanagehead">Amount Info</p>
  <div className="tmanagedata">
   <div className=" tmanagediv"><p>Subtotal:</p><p>{apidata.subtotal}</p></div> 
    <div className=" tmanagediv"><p>Shipping Charges:</p> <p>{apidata.shippingcharges}</p></div>
    <div className=" tmanagediv"><p>Tax:</p><p>{apidata.tax}</p></div> 
    <div className=" tmanagediv"><p>Discount:</p> <p>{apidata.discount}</p></div>
    <div className=" tmanagediv" style={{fontWeight:"600"}}><p >Total:</p> <p >{apidata.total}</p></div>

  
  </div>

</div>


<div className="tmanageuser">
  <p className="tmanagehead">Status</p>
  <div className="tmanagedata">
   <div className=" tmanagediv"  style={{fontWeight:"600",fontSize:"1.3rem"}}><p>Status:</p><p  className={`${apidata.status==="Processing"?"yellows":""} ${apidata.status==="Delivered"?"green":""} ${apidata.status==="Shipped"?"blues":""}`}>{apidata.status}</p></div> 
  </div>

</div>


<div className="tmanageuser tmanagebutton"><button className="tmanageprocess" onClick={()=>apidata.status==="Delivered"?toast.success("Oreder already Delivered"):handleclick()}>Process Status</button></div>


</>:""}





     
        </div>


      </div>
    </div>
  );
};

export default Pmanage;

// <div className=" pmanager">
// <div className="pphoto">
// <article>
//   <div className="particle">
//     <div className="mdivv">
//     <p>Order Items</p>
//     </div>
//     <div style={{width:"100%",padding:"0px 30px"}}><div style={{
//       display:"flex",
//       alignItems:"center",
//       justifyContent:"center",
//       width:"100%",
//       marginTop:"20px",
//       padding:"10px 0px",
//       borderBottom:"1.2px solid black",
//       // borderTop:"1.2px solid black",

//     }}>

//       <div className="mphotoo">
//       <img src={photo} alt="" />
//     </div>

//     <div className="tflex">

//       <h1 style={{fontSize:"1rem"}}>{name}</h1>
//       <h1 style={{fontSize:"1rem"}}> {price}*8={899879}</h1>
//     </div>

//     </div>
//     </div>

//   </div>
// </article>
// </div>
// <div>

//   <article>
//     <form className="nformm">
//       <div className="mdivv"><h2>Transaction Manage</h2></div>

// <div className="tttinfo">

// <div className="userinfo">
// <h2>User Info</h2>
// <div style={{display:"flex" ,gap:"10px", justifyContent:"space-between"}}><p>Name:</p><p style={{paddingRight:"20px"}}>{orderitemdetail[0].name}</p></div>
// <div style={{display:"flex" ,gap:"10px", justifyContent:"space-between"}}><p>Address:</p> <p style={{paddingRight:"20px",width:"70%",display:"flex",height:"auto",justifyContent:"end"}}>{orderitemdetail[0].address}</p></div>

// </div>

// <div className="amountinfo">
// <h2>Amount Info</h2>
// <div style={{display:"flex" ,gap:"10px", justifyContent:"space-between"}}><p>Subtotal:</p><p style={{paddingRight:"20px"}}>{orderitemdetail[0].subtotal}</p></div>
// <div style={{display:"flex" ,gap:"10px", justifyContent:"space-between"}}><p>Shipping Charges:</p><p style={{paddingRight:"20px"}}>{orderitemdetail[0].shipping}</p></div>
// <div style={{display:"flex" ,gap:"10px", justifyContent:"space-between"}}><p>Tax:</p><p style={{paddingRight:"20px"}}>{orderitemdetail[0].tax}</p></div>
// <div style={{display:"flex" ,gap:"10px", justifyContent:"space-between"}}><p>Discount:</p><p style={{paddingRight:"20px"}}>{orderitemdetail[0].discount}</p></div>
// <div style={{display:"flex" ,gap:"10px", justifyContent:"space-between"}}><p>Total:</p><p style={{paddingRight:"20px"}}>{orderitemdetail[0].total}</p></div>

// </div>

// <div className="statusinfo">
// <h2>Status Info</h2>
// <div style={{ margin:"0px",display:"flex" ,justifyContent:"center"}}> <div style={{fontSize:"1.2rem",fontWeight:"500",margin:"0px",display:"flex",gap:"20px"}}><p>Status:</p><p>{orderitemdetail[0].status}</p></div></div>
// </div>

// </div>
//         <div className="newbutton">
//           <button className="tbutton">Process Status</button>
//         </div>

//     </form>
//   </article>
// </div>
// </div>
