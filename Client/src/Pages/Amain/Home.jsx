import React, { useEffect, useState } from "react";
import "../../Style/Home.scss";
import { Link } from "react-router-dom";
import { productapi } from "../../api";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux'
import { addtocart } from "../../redux/orderfeature";
import { TfiLink } from "react-icons/tfi";

const Home = () => {
  const dispatch = useDispatch();

  const [data, setdata] = useState(null)


  console.log(data);


  const productdata = async () => {

    try {

      const res = await productapi.get("/latest")

      setdata(res.data)


    } catch (error) {
      console.log(error);

    }



  }

  useEffect(() => {
    productdata()


  }, [])







  return (
    <>

      <div className="home">

        <section><img src={"http://res.cloudinary.com/dhte80xl2/image/upload/v1746197089/cp6xxcxnmymzymcalxdh.png"} /></section>

        <h1>
          Latest Product
          <Link to={"/search"}><p style={{ textDecoration: "underline" }}>More</p></Link>
        </h1>


        <div className="productmain">
          {data ? data.map((itm) => {
            return (
              <div className="product ">
                {/* <div className="overlay">
                <Link to={`/detail/${itm._id}`}>  <button className="detailbutton" ><TfiLink/></button></Link>
                </div> */}
                
                <img className="detailimage" src={itm.photo} alt="" />
                <div className="productheading"><p className="productpara">{itm.name}</p></div>
                <p className="productpara">Price {itm.price}</p>
                <div className="productbutton"><button onClick={() => {


                  {
                    itm.stock > 0 ? dispatch(addtocart({
                      price: itm.price,
                      productid: itm._id,
                      name: itm.name,
                      image: itm.photo,
                      stock: itm.stock,
                      quantity: 1,
                    })) : ""
                  }



                  { itm.stock > 0 ? "" : toast.error("Not Available in Stock") }
                }}>Add to cart</button></div>
              </div>
            )
          }) : null}


        </div>

      </div>
    </>
  );
};

export default Home;
