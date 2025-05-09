import React, { useState } from "react";
import "../../Style/shipping.scss";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateorder } from "../../redux/orderfeature";

const Shipping = () => {
  const user = useSelector((state) => state.order.orderdata.user);
  const dispatch = useDispatch();

  const currentstate = useSelector(
    (state) => state.order.orderdata.shippinginfo
  );
  const orders = useSelector((state) => state.order);

  const [shippinginfo, setshippinginfo] = useState(currentstate);
  console.log(orders);

  const navigate = useNavigate();

  const submithandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(
        updateorder({
          shippinginfo: {
            address: shippinginfo.address,
            city: shippinginfo.city,
            state: shippinginfo.state,
            country: shippinginfo.country,
            pincode: shippinginfo.pincode,
          },
        })
      );

      { user ? navigate('/payment') : navigate("/") }
    } catch (error) { }
  };

  return (
    <div className="shipping">
      <div className="shippingback">
        <button onClick={() => navigate("/cart")}>
          <IoMdArrowRoundBack />
        </button>
      </div>

      <div className="shippingaddress">
        <div className="shippingbox">
          <h1 className="shippingheaad">Shipping Address</h1>
          <form className="shippingform" onSubmit={submithandler}>
            <div className="shippingaddressbox">
              <div className="shipaddress">
                <input
                  type="text "
                  required
                  placeholder="Address"
                  name="address"
                  value={shippinginfo.address}
                  onChange={(e) =>
                    setshippinginfo({
                      ...shippinginfo,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="shippingaddressbox">
              <div className="shipaddress">
                <input
                  type="text "
                  required
                  placeholder="City"
                  name="city"
                  value={shippinginfo.city}
                  onChange={(e) =>
                    setshippinginfo({ ...shippinginfo, city: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="shippingaddressbox">
              <div className="shipaddress">
                <input
                  type="text "
                  required
                  placeholder="State"
                  name="state"
                  value={shippinginfo.state}
                  onChange={(e) =>
                    setshippinginfo({ ...shippinginfo, state: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="shippingaddressbox">
              <div className="shipaddress">
                <input
                  type="number"
                  required
                  placeholder="Pin Code"
                  name="pin"
                  value={shippinginfo.pincode}
                  onChange={(e) =>
                    setshippinginfo({
                      ...shippinginfo,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="shippingaddressbox">
              <div className="shipaddress">
                <input
                  type="text "
                  required
                  placeholder="Country"
                  name="country"
                  value={shippinginfo.country}
                  onChange={(e) =>
                    setshippinginfo({
                      ...shippinginfo,
                      country: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="shippingpay">
              <button type="submit">Pay Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
