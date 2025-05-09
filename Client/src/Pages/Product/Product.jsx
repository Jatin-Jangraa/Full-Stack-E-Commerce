import React, { useEffect, useState } from "react";
import "../../Style/product.scss"
import { MdDeleteForever } from "react-icons/md";

import { product_data } from "../../assets/Data/data";
import { SiPandora } from "react-icons/si";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Newproduct from "../Management/Newproduct/Newproduct";
import Sidebar from "../../Components/Side/Sidebar";
import { productapi } from "../../api";
import toast from "react-hot-toast";

const Product = () => {

  const navigate = useNavigate()

  const [allproduct,setallproduct]=useState(null)

  let products

  const apidata = async()=>{

    const res = await productapi.get("/allproduct")
    products=res.data
    console.log(products);
    setallproduct(products)
  }

  useEffect(() => {
    apidata()
  
   
  }, [products])
  


  return (
    <>
      <div className="mmain">
        <div className="productside">
          <Sidebar />
        </div>

        <div className="productmain">
          <div className="productheading">
            <h1>Product</h1>
           <Link to={"/admin/product/new"}><div className="plus-logo"><FaPlus/></div></Link> 
          </div>

          <div className="productdata">
            <div className="productphoto">
              <p>Photo</p>
            </div>
            <div className="productname">
              <p>Name</p>
            </div>
            <div className="productprice">
              <p>Price</p>
            </div>
            <div className="productstock">
             
              <p>Stock</p>
            </div>
            <div className="productaction">
              <p>Action</p>

            </div>

            <div className="productdelete">
              <p>Delete</p>
              
            </div>
           
          </div>

          {allproduct?allproduct.map((dta) => {
            return (
              <div className="productdata">
                <div className="productphoto">
                  
                    <img src={dta.photo }  />
                  
                </div>
                <div className="productname">
                  <p>{dta.name}</p>
                </div>
                <div className="productprice">
                  <p>{dta.price}</p>
                </div>
                <div className="productstock">
                 
                  <p>{dta.stock}</p>
                </div>
                <div className="productaction">
                <Link to={`/admin/product/${dta._id}`}><div className='system'>Manage</div> </Link>
                </div>

                <div className="productdelete">
               <button onClick={async()=>{
                
                const confirm = window.confirm("Are you Sure to delete Product Permanently?")


                
               if(confirm) try {
                  
                  const res =await productapi.delete(`/delete/${dta._id}`)

                  

                  toast.success("Product Deleted Successfully")

                 
                  if(res) apidata()

                } catch (error) {
                  console.log(error);
                  
                }

               }}> <MdDeleteForever/></button>
                </div>
              </div>
            );
          }):null}
        </div>
      </div>
    </>
  );
};

export default Product;
