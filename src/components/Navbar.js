import React from "react";
import { Link , useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {

    let location = useLocation().pathname;
    let navigate = useNavigate();

    const handleLogout = () => {
      localStorage.removeItem('token');
      navigate('/login');
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBook
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
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${location === "/" ? "active" : ""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location === "/about" ? "active" : ""}`} aria-current="page" to="/about">
                  About
                </Link>
              </li>
            </ul>
          </div>
          { !localStorage.getItem('token') ? <form className="d-flex">
          <Link className="btn btn-primary btn active mx-1" role="button" aria-pressed="true" to = "/login">Login</Link>
          <Link className="btn btn-primary btn active mx-1" role="button" aria-pressed="true" to = "/signup">Signup</Link></form>:
          <button onClick = {handleLogout} className = "btn btn-primary btn active mx-1">Log out</button>}
          </div>
      </nav>
    </>
  );
}