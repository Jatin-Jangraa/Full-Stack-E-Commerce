
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transactionapi } from "../../api";
import { useDispatch, useSelector } from "react-redux";
import { emptycart } from "../../redux/orderfeature";


function RazorpayButton({ amount }) {
  const dispatch = useDispatch()
  const { orderdata } = useSelector((state) => state.order)
  const [data, setdata] = useState(orderdata)
  const navigate = useNavigate()
  useEffect(() => {
    const script = document.createElement("script");
    script.src = import.meta.env.VITE_PAYMENT_link;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    const options = {
      key: import.meta.env.VITE_PAYMENT, // Replace with your Razorpay key ID
      amount: amount * 100, // Razorpay amount is in paise
      currency: "INR",
      name: "Jatin's Store",
      description: " Payment ",
      handler: function (response) {
        console.log(response);

        if (response) {
          navigate("/orders")

          try {

            const res = transactionapi.post("/new", data)

            if (res) {
              console.log("Ordered by jatin")
              dispatch(emptycart())
            };


          } catch (error) {

          }

        }

      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <button onClick={handlePayment}>Pay ₹{amount}</button>;
}

export default RazorpayButton;
