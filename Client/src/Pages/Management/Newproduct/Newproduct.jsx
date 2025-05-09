import React, { useState } from "react";
import "./Newproduct.css";
import Sidebar from "../../../Components/Side/Sidebar";
import { productapi } from "../../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Newproduct = () => {

  const navigate = useNavigate();



  const [newproduct, setnewproduct] = useState({
    name: "",
    price: null,
    stock: null,
    photo: null,
    category: "",
  })

  console.log(newproduct);


  const submithandler = async (e) => {


    e.preventDefault();


    try {

      const res = productapi.post('new', newproduct)


      console.log((await res).data);


      setnewproduct({
        name: "",
        price: "",
        stock: "",
        photo: "",
        category: "",
      }
      )
      navigate('/admin/product')
      toast.success("Product Created Successfully")



    } catch (error) {

      toast.error("Failed to Create Product")
    }



  }





  return (
    <div className="newmain">
      <div className=" newside"><Sidebar /></div>
      <div className="newmainbox">
        <article>
          <form className="nform" onSubmit={submithandler}>
            <h2>New Product</h2>



            <div className="nitem">
              <div className="label"><label>Name</label> <label >:</label></div>
              <div className="iinput"> <input
                required
                type="text"
                placeholder="Name"
                value={newproduct.name}
                onChange={(e) => setnewproduct({ ...newproduct, name: e.target.value })}
              /></div>
            </div>

            <div className="nitem">
              <div className="label"> <label>Photo</label><label >:</label></div>
              <div className="iinput"><input
                required
                type="file"

                placeholder="Image"
                onChange={async (e) => {
                  const file = e.target.files[0]
                  // setphoto(URL.createObjectURL(file))


                  const data = new FormData()
                  data.append("file", file)
                  data.append("upload_preset", "JatinJangra")
                  data.append("cloud_name", "dhte80xl2")


                  const res = await fetch("https://api.cloudinary.com/v1_1/dhte80xl2/image/upload", {
                    method: "POST",
                    body: data
                  })
                  const uploadedimage = await res.json()

                  console.log(uploadedimage.url);
                  setnewproduct({ ...newproduct, photo: uploadedimage.url })
                }}

              /></div>
            </div>

            <div className="nitem">
              <div className="label"> <label>Price</label><label >:</label></div>
              <div className="iinput"> <input
                required
                type="number"
                placeholder="Price"
                value={newproduct.price}
                onChange={(e) => setnewproduct({ ...newproduct, price: Number(e.target.value) })}
              /></div>
            </div>

            <div className="nitem">
              <div className="label"> <label>Stock</label><label >:</label></div>
              <div className="iinput"> <input
                required
                type="number"
                placeholder="Stock"
                value={newproduct.stock}
                onChange={(e) => setnewproduct({ ...newproduct, stock: Number(e.target.value) })}
              /></div>
            </div>

            <div className="nitem">
              <select required onChange={(e) => setnewproduct({ ...newproduct, category: e.target.value })} >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Fashion">Fashion</option>
                <option value="Toys">Toys</option>
                <option value="Furniture">Furniture</option>
                <option value="Grocery">Grocery</option>

                {/* <option value="c">c</option>
      <option value="d">d</option> */}

              </select>
              {/* <input
                required
                type="text"
                placeholder="Category"
                value={newproduct.category}
                onChange={(e) => setnewproduct({...newproduct,category:(e.target.value)})}
              /> */}



            </div>


            <div>
              <div style={{ justifySelf: "center" }}>{newproduct.photo && (
                <div className="urlphoto">
                  <img src={newproduct.photo} alt="" />
                </div>
              )}</div>

              <div className="newbutton"><button className="nbutton" type="submit">Create</button></div>
            </div>




          </form>
        </article>
      </div>
    </div>
  );
};

export default Newproduct;
