import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import  Modal  from "../Modal";
import Cart from "../screens/Cart";import { useCart } from '../components/ComponentsReducer';

export default function Navbar() {
  const [cartView, setcartView]=useState(false);
  const navigate = useNavigate();
  let data = useCart();
  
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
              
                </li>
              )}
            </ul>
            {localStorage.getItem("authToken") ? (
              <div>
                <div className="btn btn-light text-success mx-2" onClick={()=>{setcartView(true)}} to="/cart">
                  My Cart{" "}
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView? <Modal onClose={()=>{setcartView(false)}}><Cart/></Modal>:null}
                <button className="btn btn-light text-success mx-2" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-light text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn btn-light text-success mx-1" to="/createuser">
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
