import Home from "./Home";
import { setUserData } from "../redux/app/index";
import { useDispatch } from "react-redux";

import { GoogleLogin } from "react-google-login";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRef = useRef("");
  const errRef = useRef("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("isLoggedIn");
    if (session) {
      navigate("/");
    }
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(user, pwd);

    e.preventDefault();
    const email = user;
    const password = pwd;

    axios
      .post("http://localhost:8080/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(response.data));

        dispatch(setUserData(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clientid =
    "611989440578-47h9lve8j275kk8kr2a9sknt8q83veld.apps.googleusercontent.com";
  const onLoginsuccess = (res) => {
    const email = res.profileObj.email;
    const name = res.profileObj.givenName + " " + res.profileObj.familyName;
    axios
      .post("http://localhost:8080/register ", {
        email,
        name,
        password: " ",
      })
      .then((response) => {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(setUserData(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="containr-fluid "
      style={{ backgroundColor: "rgb(100, 10, 10, 0.6)", height: "100vh" }}
    >
      <div className=" container   border border-0 rounded ">
        <section className="   row">
          <div className="col-3 ">
            <div className="career"></div>
          </div>
          <div
            className=" mt-5  tect-center col-6 rounded"
            style={{ backgroundColor: "rgb(200, 200, 200, 0.2)" }}
          >
            <section>
              <h1 className=" text-justify text-center heading-or">Login</h1>

              <form onSubmit={submitHandler}>
                <br />
                <label htmlFor="username" className="text-white-50">
                  Username:
                </label>
                <input
                  className="form-control  shadow-lg input-field bg-transparent text-white  "
                  id="username"
                  required
                  type="text"
                  ref={userRef}
                  value={user}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                />
                <br />
                <label htmlFor="password" className="text-white-50">
                  Password:
                </label>
                <input
                  className="form-control mr-sm-2 shadow-lg bg-transparent text-white "
                  id="password"
                  required
                  type="password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />

                <br />
                <div class="col text-center">
                  <button
                    className="btn btn-outline-primary    shadow col-example z-depth-1 border-primary mb-4  "
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </section>
          </div>

          <div className="col-3 "></div>
          <div className="align-content-center align-content-lg-center align-items-center col-sm-3 ">
            <Link
              className="btn btn-primary btn-lg"
              to="/register"
              role="button"
            >
              Register
            </Link>
            <GoogleLogin
              className=" rounded text-dark  "
              clientId={clientid}
              buttonText=" Easy Login with Google+ "
              onSuccess={onLoginsuccess}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Login;
