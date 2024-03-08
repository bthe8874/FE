import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css";

function LoginPage({ setIsLoggedIn }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        name,
        password,
      });
      const responseData = response.data;
      // const accessToken = localStorage.setItem("accessToken");

      if (responseData && responseData.code === "NotAuthorizedException") {
        alert("User is not Regsitered.");
        navigate("/register");
      } else {
        console.log("Login successful:", responseData);
        localStorage.setItem("user", JSON.stringify(responseData));
        const userDataString = localStorage.getItem("user");
        const userData = JSON.parse(userDataString);
        localStorage.setItem("accesstoken", userData.sub);

        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === "NotAuthorizedException"
      ) {
        alert("Invalid username or password. Please try again.");
      } else if (error.response && error.response.status === 404) {
        const register = window.confirm(
          "User not registered. Do you want to register now?"
        );
        if (register) {
          navigate("/register");
        }
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    UserName
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    placeholder="Enter Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
