import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import logo from "../assets/Logo.png";
import { BiShow, BiHide } from "react-icons/bi"; // Assuming you have imported eye icons

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("login-background");

    return () => {
      document.body.classList.remove("login-background");
    };
  }, []);

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(
          `http://localhost:8000/users?userName=${userName}&password=${password}`
        );
        const data = await response.json();
        if (data.length === 0) {
          setLoginError("Invalid credentials");
        } else {
          if (data[0].password === password) {
            setLoginError("");
            navigate("/tab3");
          } else {
            setLoginError("Invalid credentials");
          }
        }
      } catch (error) {
        setLoginError("Login failed: " + error.message);
      }
    }
  };

  const validate = () => {
    let isValid = true;
    if (userName.trim() === "") {
      isValid = false;
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (password.trim() === "") {
      isValid = false;
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    return isValid;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="backgroundimg">
        <div className="login">
          <img src={logo} alt="ss" />
          <h2>Online Project Management</h2>
          <div className="row">
            <div className="offset-lg-1 col-lg-10">
              <form onSubmit={proceedLogin} className="container">
                <div className="card">
                  <div className="card-header">
                    <p className="text-2xl">Login to get started</p>
                  </div>
                  <div className="card-body">
                    <div
                      className={`form-group ${
                        usernameError ? "has-error" : ""
                      }`}
                    >
                      <label>
                        Email{" "}
                        <span className="errmsg">
                          {usernameError && "Please enter username"}
                        </span>
                      </label>
                      <input
                        type="email"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className={`form-control ${
                          usernameError ? "is-invalid" : ""
                        }`}
                      />
                    </div>
                    <div
                      className={`form-group ${
                        passwordError ? "has-error" : ""
                      }`}
                    >
                      <label>
                        Password{" "}
                        <span className="errmsg">
                          {passwordError && "Please enter password"}
                        </span>
                      </label>

                      <div className="input-group">
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className={`form-control ${passwordError ? "is-invalid" : ""}`}
    />
    <div className="input-group-append">
      <span className="input-group-text bg-transparent border-0" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <BiHide /> : <BiShow />}
      </span>
    </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>
                  </div>
                </div>
              </form>
              {loginError && (
                <div className="alert alert-danger mt-3">{loginError}</div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
