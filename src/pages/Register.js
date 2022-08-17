import { setUserData } from "../redux/app/index";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    const session = localStorage.getItem("isLoggedIn");
    if (session) {
      navigate("/");
    }
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/register", {
        email,
        password: pwd,
        name,
      })
      .then((response) => {
        navigate("/login");
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
        <section className="row">
          <div className="col-3 ">
            <div className="career"></div>
          </div>
          <div
            className=" mt-5  tect-center col-6 rounded"
            style={{ backgroundColor: "rgb(200, 200, 200, 0.2)" }}
          >
            <section>
              <h1 className=" text-justify text-center heading-or">
                Registration
              </h1>

              <br />
              <label htmlFor="username" className="text-white-50">
                Name:
              </label>
              <input
                className="form-control  shadow-lg input-field bg-transparent text-white"
                required
                type="text"
                value={name}
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <label htmlFor="email" className="text-white-50">
                Email:
              </label>
              <input
                className="form-control mr-sm-2 shadow-lg bg-transparent text-white "
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="text-white-50">
                Password:
              </label>
              <input
                className="form-control mr-sm-2 shadow-lg bg-transparent text-white "
                required
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <br />
              <div class="col text-center">
                <button
                  onClick={submitHandler}
                  className="btn btn-outline-primary    shadow col-example z-depth-1 border-primary mb-4  "
                  type="submit"
                >
                  Register
                </button>
              </div>
            </section>
          </div>

          <div className="col-3 "></div>

          <div
            className="row mt-3 contaner "
            style={{ position: "relative", left: "12px" }}
          >
            <div className="col-sm-3"></div>
            <div className="col-sm-2 text-white mt-3">
              <hr />
            </div>
            <div className=" col-sm-2 text-white">
              <h2 className="heading-or text-justify text-center "> OR </h2>
            </div>
            <div className="col-sm-2 text-white mt-3">
              <hr />
            </div>

            <div className="col-sm-3"></div>
          </div>

          <div className="align-content-center align-content-lg-center align-items-center col-sm-3 ">
            <Link className="btn btn-primary btn-lg" to="/login" role="button">
              Login
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

export default Register;
