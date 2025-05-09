import React, { useState } from "react";
import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import '../../Style/Header.scss'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux'
import { logout } from "../../redux/feature";
import { FaBagShopping } from "react-icons/fa6";


const Header = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const { user, userid } = useSelector((state) => state.counter)

  const { orderitems } = useSelector((state) => state.order.orderdata)

  const myuser = { _id: userid, role: user };
  const [isopen, setisopen] = useState(false);


  const logouthandler = () => {

    dispatch(logout())
    navigate("/")
  }

  return (
    <nav className="header" >
      <div className="headerhome">
        <Link to={"/"}>Home</Link>


        <Link to={"/search"}>
          <FaSearch />
        </Link></div>

      <div className="usersign">
        <span><Link to={"/cart"}>
          <FaBagShopping className="user" />
        </Link>
        </span><span style={{ marginLeft: "-20px", marginTop: "-10px" }}>{orderitems.length}</span>

        {myuser?._id ? (
          <>
            <button onClick={() => setisopen((prev) => !prev)}>
              <FaRegUserCircle className="user" />
            </button>
            <dialog open={isopen}>
              <div >
                {myuser.role === "admin" && (
                  <Link to={"/admin/dashboard"}><div className="users"><p>Admin</p></div>
                  </Link>
                )}
                <Link to={"/orders"}><div className="users"><p>Orders</p></div></Link>
                <button className="users" onClick={logouthandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </dialog>
          </>
        ) : (
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        )}</div>
    </nav>
  );
};

export default Header;
