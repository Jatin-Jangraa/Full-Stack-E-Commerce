import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrease, increase, remove_from_cart, updateorder } from "../../redux/orderfeature";
import { paymentapi } from "../../api";
import toast from "react-hot-toast";

import "../../Style/cart.scss";

import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { TiTick } from "react-icons/ti";




const Cart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [isedisabled, setisedisabled] = useState(false)
  const [coupancode, setcoupancode] = useState("")
  const { orderitems, discount, total } = useSelector((state) => state.order.orderdata)
  const {  userid, name } = useSelector((state) => state.counter)
  const [data, setdata] = useState()
  const [price, setprice] = useState({ subtotal: "", tax: "", shippingcharges: "", total: "" })

  useEffect(() => {
    dispatch(updateorder({ discount: 0 }))
  }, [])





  const updateme = () => {
    setdata(orderitems)

    let estimate = 0;
    let num = 0

    for (let i = 0; i < orderitems.length; i++) {
      const item = orderitems[i];

      estimate += item.price * item.quantity
      num += item.quantity
    }


    setprice({
      subtotal: estimate, tax: Math.round(estimate * 0.18), shippingcharges: num * 300, total: (estimate) + (Math.round(estimate * 0.18)) + (num * 300)
    })


    dispatch(updateorder({
      subtotal: estimate,
      tax: Math.round(estimate * 0.18),
      shippingcharges: num * 300,
      total: (estimate) + (Math.round(estimate * 0.18)) + (num * 300)
    }
    ))


  }




  useEffect(() => {
    updateme()
  }, [orderitems])



  return (
    <div className="mainbox">
      {orderitems.length !== 0 ?
        <div className="cart">
          <div className="cartitems">
            {data ? data.map((itm) => {


              let number = 1;
              return (

                <div className="cartitem">
                  <div className="cartimage">
                    <img src={itm.image} alt="" />
                  </div>

                  <div className="cartitemname">
                    <p>{itm.name}</p>
                    <p>{itm.price}</p>
                  </div>

                  <div className="cartitemmanage">
                    <div className="cartplus">
                      <button onClick={() => {

                        {
                          itm.quantity > 1 ? dispatch(decrease({
                            productid: itm.productid,
                            newnumber: {
                              quantity: itm.quantity - 1
                            }
                          }))
                            : ""
                        }


                      }}><FaMinus /></button>
                      <p>{itm.quantity}</p>
                      <button onClick={() => {

                        {
                          itm.stock >= itm.quantity ? dispatch(increase({
                            productid: itm.productid,
                            newnumber: {
                              quantity: itm.quantity + 1
                            }
                          })) : toast.error(" More Stock not Available")
                        }


                      }}><FaPlus /></button>

                    </div>
                    <div className="cartdelete">
                      <div className="cartdeletebox"><button onClick={() => {
                        dispatch(remove_from_cart({
                          productid: itm.productid
                        }))
                      }}><MdDeleteOutline /></button></div>
                    </div>
                  </div>
                </div>

              )
            }) : ""}




          </div>






          <div className="cartitemdetail">

        


            <div className="cartuser">
              <p className="carthead">Amount Info</p>
              <div className="cartdata">
                <div className=" cartdiv"><p>Subtotal:</p><p style={{ color: "white" }}>{price.subtotal}</p></div>
                <div className=" cartdiv"><p>Shipping Charges:</p> <p style={{ color: "white" }}>{price.shippingcharges}</p></div>
                <div className=" cartdiv"><p>Tax:</p><p style={{ color: "white" }}>{price.tax}</p></div>
                <div className=" cartdiv"><p>Discount:</p> <p style={{ color: "white" }}>{discount}</p></div>
                <div className=" cartdivv" style={{ fontWeight: "650", fontSize: "1.3rem" }}><p style={{ fontWeight: "650", fontSize: "1.3rem" }}>Total:</p> <p style={{ fontWeight: "600", fontSize: "1.3rem", color: "white" }}>{total}</p></div>


              </div>


              <div className="cartinput">
                <input type="text" placeholder=" Coupan Code" value={coupancode} onChange={(e) => (setcoupancode(e.target.value))} />
                <button className="applybutton" disabled={isedisabled} onClick={async () => {
                  try {

                    const res = await paymentapi.get("discount", {
                      params: {
                        coupan: coupancode
                      }
                    })

                    if (res.data.amount) {
                      setisedisabled(true)
                    }

                    console.log(await (res).data);


                    {
                      (res.data.amount) ?
                        (
                          dispatch(updateorder({

                            discount: await (res).data.amount,
                            total: (total) - await (res.data.amount)


                          }

                          )), toast.success("Coupan successfully Applied"))
                        : (dispatch(updateorder({

                          discount: 0,
                          total: total

                        }

                        )), toast.error("Invalid Coupan Code"))
                    }


                  } catch (error) {
                    setisedisabled(false)
                  }



                }}> <TiTick /> </button>

              </div>


              <div className="cartcoupanvalid">

              </div>


              <div className="cartbuybutton">
                <button onClick={() => {

                  userid ? dispatch(updateorder({

                    user: userid,
                    name: name,
                  }

                  ),
                    navigate("/shipping")
                  ) : (navigate("/login"),
                    toast.error("Please Login Before Order"))



                }} >Check Out</button>
              </div>

            </div>



          </div>
        </div> : <div className="carted"><h2 className="isempty">Cart is Empty</h2></div>}
    </div>
  );
};

export default Cart;
