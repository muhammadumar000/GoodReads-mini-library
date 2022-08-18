import React, { useEffect, useState } from "react";

// MUI imports
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// redux imports
import { useDispatch } from "react-redux";
import { setLoginUserData } from "../Features/userSlice";

// react router imports
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// react toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// copyrightComponent

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {"GoodReads Mini Library "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// function for getting data from local Storage
const getData = () => {
  if (localStorage.getItem("userData")) {
    return JSON.parse(localStorage.getItem("userData"));
  } else {
    return [];
  }
};

const theme = createTheme();

export default function SignIn() {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginData, setLoginData] = useState({});
  const [userData, setUserData] = useState(getData());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const submitHandler = () => {
    const data = {
      email: email,
      password: password,
    };

    // checks for empty input field
    if (email && password) {
      setLoginData(data);
      login(data);
    } else {
      setEmail("");
      setPassword("");
      toast.info("Please fill all the fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  // function to check the login details match with the data stored in local storage

  const login = (data) => {

    // filtered data on the basis of input email and password
    const filteredData = userData.filter(
      (item) => item.email === data.email && item.password === data.password
    );

    // check that user enter invalid email or password
    if (filteredData.length > 0) {
      dispatch(setLoginUserData(filteredData));
      setEmail("");
      setPassword("");
      toast.success(`Login Success,Welcome ${filteredData[0].userName} `, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setEmail("");
      setPassword("");
      toast.error("Invalid Email or Password", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  // for getting data from local storage when user click login button
  useEffect(() => {
    setUserData(getData());
  }, [submitHandler]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        alignItems="center"
        sx={{ width: "100%", height: "100vh", bgcolor: "#f2f2f2 " }}
      >
        <Container component="main" maxWidth="xs" height="50%">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#52ab98" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography color="#2b6777" component="h1" variant="h5">
              Log In
            </Typography>
            <Box sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={submitHandler}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#52ab98",
                  "&:hover": { bgcolor: "#2b6777" },
                }}
              >
                Log In
              </Button>
              <ToastContainer />
              <Grid container>
                <Grid item mx="auto" my={1}>
                  <Link to="/signup">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
