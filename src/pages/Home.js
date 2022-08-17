import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { getUserData } from "../redux/app/index";
import { useSelector } from "react-redux";

function Home() {
  const [session, setSession] = useState(null);
  const userData = useSelector(getUserData);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.log("handleLogout", error);
    }
  };
  useEffect(() => {
    const s = localStorage.getItem("isLoggedIn");
    if (s) {
      setSession(s);
    }
  }, []);
  return (
    <div className="container">
      <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-transparent  ">
        Project
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"> </span>
        </button>
        <div className="col-5"></div>

        <div
          className="collapse navbar-collapse col-5"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto float-xl-left ">
            {session ? (
              <li className="nav-item ">
                <Link className="nav-link h6 " to="/">
                  <strong> {userData.name} </strong>
                </Link>
              </li>
            ) : (
              <li className="nav-item ">
                <Link className="nav-link h6 " to="/register">
                  <strong> Register </strong>
                </Link>
              </li>
            )}

            {session ? (
              <li className="nav-item ">
                <a href="" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            ) : (
              <li className="nav-item ">
                <Link className="nav-link h6 " to="/login">
                  <strong> Login </strong>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
      {session ? (
        <div className="row">
          <div className="col-12">
            <div className="jumbotron">
              <h1 className="display-4">Welcome to Project</h1>
              <p className="lead">User's Information</p>
              <hr className="my-4" />
              <table>
                <tr>
                  <th style={{ width: "100px" }}>Name</th>
                  <th>Email</th>
                </tr>
                <tr>
                  <td>{userData.name}</td>
                  <td>{userData.email}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="jumbotron">
              <h1 className="display-4">Welcome to Project</h1>
              <p className="lead">
                This is simple react project, where you can register and login.
              </p>
              <hr className="my-4" />
              <div style={{ justifyContent: "space-between" }}>
                <Link
                  className="btn btn-primary btn-lg"
                  to="/register"
                  role="button"
                >
                  Register
                </Link>
                <Link
                  className="btn btn-primary btn-lg"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
