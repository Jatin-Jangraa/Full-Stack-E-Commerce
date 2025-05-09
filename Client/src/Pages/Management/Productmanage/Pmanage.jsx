import React, { useState ,useEffect} from "react";
import ".././../../Style/pmanage.scss"
import Sidebar from "../../../Components/Side/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { productapi } from "../../../api";
import toast from "react-hot-toast";

const Pmanage = () => {

  const navigate = useNavigate()


  const {id} = useParams()

const [presentdata,setpresentdata ] = useState({
  name:"",
  price:"",
  stock:"",
  image:"",
})

  console.log(id);
  

  const data = async()=>{

    try {
      
      const res = await productapi.get(`/find/${id}`)

      setpresentdata({...presentdata,name:res.data.name,image:res.data.photo,stock:res.data.stock,price:res.data.price})

    } catch (error) {
      
    }
  }


  useEffect(() => {
    data()
  
   
  }, [])
  

 const formhandler=async(e)=>{
  e.preventDefault();


  try {
    
    const res = productapi.put(`/put/${id}`,presentdata)

    toast.success("Product Updated Successfully")

    navigate("/admin/product")


data()

  } catch (error) {
    console.log(error);
    toast.error("Failed to Update Product")
  }

 }






  return (
   <>
    <div className="pmanage">
         <div className="pmanageside">
           <Sidebar />
         </div>
         <div className="pmanagemain">

         <div className="pmanagebox">
         {/* <article className="pmanageart"> */}
<div className="particle">

<div className="mdiv">
  {presentdata?
presentdata.stock>0?( <p className="mpara cgreen" >{presentdata.stock} Available</p>):( <p className="mpara cred" >Not Available</p>):null}
</div>
<div className="mphoto">
<img src={presentdata?presentdata.image:null} alt="" />
</div>

<div style={{display:"flex",marginTop:"20px",justifyContent:"center"}}><p style={{fontSize:"1.2rem",fontWeight:"500"}}>{presentdata?presentdata.name:null}</p></div>
<div style={{display:"flex",marginTop:"20px",justifyContent:"center"}}><p style={{fontSize:"1.2rem",fontWeight:"500"}}>Rs.{presentdata?presentdata.price:null}</p></div>
</div>
{/* </article> */}

         </div>










         <div className="pmanagebox">

         {/* <article className="pmanageart"> */}
          <form className="pmanageform" onSubmit={formhandler}>
    
      <div className="pmanageheadi"><h2>Manage Product</h2></div>


<div className="pmanageitembox">
      <div className="nitem">
        <div className="labeli"><label>Name</label> <label >:</label></div>
       <div className="inputi"> <input className="pamangeinput"
          required 
          type="text"
          placeholder="Name"
          value={presentdata.name}
          onChange={(e) => setpresentdata({...presentdata,name:e.target.value})}
        /></div>
      </div>

      <div  className="nitem">
       <div className="labeli"> <label>Price</label><label >:</label></div>
       <div className="inputi"> <input className="pamangeinput"
          required
          type="number"
          placeholder="Price"
          value={presentdata.price}
          onChange={(e) => setpresentdata({...presentdata,price:Number(e.target.value)})}
        /></div>
      </div>

      <div  className="nitem">
       <div className="labeli"> <babel>Stock</babel><label >:</label></div>
       <div className="inputi"> <input  className="pamangeinput"
          required
          type="number"
          placeholder="Stock"
          value={presentdata.stock}
          onChange={(e) => setpresentdata({...presentdata,stock:Number(e.target.value)})}
        /></div>
      </div>

      

    
      </div>
<div>
<div >{presentdata.image&& (
<div className="urlphoto">
<img src={presentdata.image} alt="" />
</div>
)}</div>
      

</div>
<div className="pmanagebutton"><button className="pmanagebtn" type="submit">Update</button></div>

</form>
  {/* </article> */}
         </div>




         </div>
         </div>
   
   </>
  )
};




export default Pmanage










{/* <div className="pphoto"></div> */}
{/* <div> <article>
    <form className="nform">
      <h2>Manage Product</h2>



      <div className="nitem">
        <div className="label"><label>Name</label> <label >:</label></div>
       <div className="iinput"> <input
          required 
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
        /></div>
      </div>

      <div  className="nitem">
       <div className="label"> <label>Price</label><label >:</label></div>
       <div className="iinput"> <input
          required
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setprice(Number(e.target.value))}
        /></div>
      </div>

      <div  className="nitem">
       <div className="label"> <label>Stock</label><label >:</label></div>
       <div className="iinput"> <input
          required
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setstock(Number(e.target.value))}
        /></div>
      </div>

      <div  className="nitem">
       <div className="label"> <label>Photo</label><label >:</label></div>
        <div className="iinput"><input
        
          type="file"
          onChange={handleimage}
         placeholder="Image"
        

        /></div>
      </div>
<div>
<div >{photo&& (
<div className="urlphoto">
<img src={photo} alt="" />
</div>
)}</div>
      
<div className="newbutton"><button className="nbutton">Update</button></div>
</div>


    </form>
  </article> */}
// </div></div>

 
// </div>