import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Link
} from "@mui/material";
import { styled } from "@mui/system";
import SignUpImage from "../../login.jpg"; 
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

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [registerDisabled, setRegisterDisabled] = useState(true); 
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/register", {
        name,
        email,
        password,
      });
      console.log("Registration successful:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert("Registration successfull!");
      navigate("/product");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

 
  const handleNameChange = (e) => {
    setName(e.target.value);
    
    setRegisterDisabled(!e.target.value || !email || !password);
  };

  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    
    setRegisterDisabled(!e.target.value || !name || !password);
  };

  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    
    setRegisterDisabled(!e.target.value || !name || !email);
  };

  return (
    <BackgroundImageContainer>
      <LoginFormContainer component="main" maxWidth="sm">
        <CardStyled>
          <CardContentStyled>
            <Typography variant="h5" component="h2" gutterBottom>
              Register
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={name}
              onChange={handleNameChange} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={handleEmailChange} 
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange} 
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              onClick={handleRegister}
              sx={{ mt: 2 }}
              disabled={registerDisabled} 
            >
              Register
            </Button>
            <SignUpButton
              type="button"
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/product/login")}
              sx={{ mt: 1 }}
            >
              Login
            </SignUpButton>
          </CardContentStyled>
        </CardStyled>
      </LoginFormContainer>
    </BackgroundImageContainer>
  );
}

export default SignUp;
