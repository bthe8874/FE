import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Container, TextField, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import SignUpImage from "../../login.jpg"; // Adjust the path to match your image location
import "../style/login.css";

const SignUpButton = styled(Button)({
  marginTop: "1rem",
});

const LoginFormContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const CardStyled = styled(Card)({
  maxWidth: 400,
  marginBottom: '1rem',
});

const CardContentStyled = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const BackgroundImageContainer = styled('div')({
  background: `url(${SignUpImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

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

      if (responseData && responseData.code === "NotAuthorizedException") {
        alert("User is not registered.");
        navigate("/register");
      } else {
        console.log("Login successful:", responseData);
        localStorage.setItem("user", JSON.stringify(responseData));
        const userDataString = localStorage.getItem("user");
        const userData = JSON.parse(userDataString);
        localStorage.setItem("accesstoken", userData.sub);

        setIsLoggedIn(true);
        navigate("/product");
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
          navigate("/product/register");
        }
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <BackgroundImageContainer>
      <LoginFormContainer component="main" maxWidth="sm">
        <CardStyled>
          <CardContentStyled>
            <Typography variant="h5" component="h2" gutterBottom>
              Login
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Username"
              name="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleLogin}
              sx={{ mt: 2 }}
            >
              Login
            </Button>
            <SignUpButton
              type="button"
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/product/register")}
              sx={{ mt: 1 }}
            >
              Sign Up
            </SignUpButton>
          </CardContentStyled>
        </CardStyled>
      </LoginFormContainer>
    </BackgroundImageContainer>
  );
}

export default LoginPage;
