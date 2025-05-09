import React, { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import "./app.css";

import Dashboard  from"./Pages/Dashboard/Dashboard";
import Customer  from"./Pages/Customer/Customer";
import Product  from"./Pages/Product/Product";
import Transaction  from"./Pages/Transaction/Transaction";
import Bar  from"./Pages/Bar/Bar";
import Pie  from"./Pages/Pie/Pie";
import Coupan  from"./Pages/Coupan/Coupan";
import Stop  from"./Pages/Stop/Stop";
import Toss  from"./Pages/Toss/Toss";
import Newproduct  from"./Pages/Management/Newproduct/Newproduct";
import Pmanage  from"./Pages/Management/Productmanage/Pmanage";
import Shipping  from"./Pages/Amain/Shipping";


const Tmanag = lazy(() => import("./Pages/Management/Transactionmanage/Tmanag"));


import Home from "./Pages/Amain/Home";
import Cart from "./Pages/Amain/Cart";
import Search from "./Pages/Amain/Search";
import Header from "./Components/Amain/Header";
import Login from "./Pages/Amain/Login";
import Orders from "./Pages/Amain/Orders";
import Payment from "./Pages/Amain/Payment";

const App = () => {
  const { user, userid } = useSelector((state) => state.counter);

  return (
    <Router>
      <Header />


      <Routes>
        {/* main */}

        <Route element={<Home />} path="/" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<Search />} path="/search" />
        <Route element={<Login />} path="/login" />


        <Route>
          {/* logined user */}
          {userid ? (
            <Route>
              <Route element={<Shipping />} path="/shipping" />
              <Route element={<Orders />} path="/orders" />
              <Route element={<Payment />} path="/payment" />
            </Route>
          ) : (
            ""
          )}
        </Route>

        {/* admin */}
        <Route>
          {user === "admin" ? (
            <Route>
              <Route path="/admin/dashboard" element={<Dashboard />}></Route>
              <Route path="/admin/customer" element={<Customer />}></Route>
              <Route path="/admin/product" element={<Product />}></Route>
              <Route
                path="/admin/transaction"
                element={<Transaction />}
              ></Route>
              <Route path="/admin/chart/bar" element={<Bar />}></Route>
              <Route path="/admin/chart/pie" element={<Pie />}></Route>
              <Route path="/admin/app/stopwatch" element={<Stop />}></Route>
              <Route path="/admin/app/coupan" element={<Coupan />}></Route>
              <Route path="/admin/app/toss" element={<Toss />}></Route>

              {/* managemnt */}
              <Route path="/admin/product/new" element={<Newproduct />}></Route>
              <Route path="/admin/product/:id" element={<Pmanage />}></Route>
              <Route path="/admin/transaction/:id" element={<Tmanag />}></Route>
            </Route>
          ) : (
            ""
          )}
        </Route>
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
