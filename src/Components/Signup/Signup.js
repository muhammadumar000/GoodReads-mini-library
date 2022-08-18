import React, { useEffect, useState } from "react";
// mui imports
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

// react toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux imports
import {
  setEmail,
  setPassword,
  setUserData,
  setUserName,
  setLocalStorage,
} from "../Features/userSlice";
import { useDispatch, useSelector } from "react-redux";

// react router imports
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// copyright component
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

const theme = createTheme();

export default function SignUp() {

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [getData, setGetData] = useState([]);
  const navigate = useNavigate();
  
  //  duplicate check if user enter the email that is already in the storage
  const duplicateCheck = () => {
    const duplicate = getData.filter((item) => item.email === userEmail);
    if (duplicate.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  
  // onSubmit 
  const submitHandler = () => {
    // checking for empty input field and then duplicate email
    if (name && userEmail && userPassword) {
      if (!duplicateCheck()) {
        // storing data in redux store and local storage
        dispatch(setUserName(name));
        dispatch(setEmail(userEmail));
        dispatch(setPassword(userPassword));
        dispatch(setUserData());
        dispatch(setLocalStorage()); 
        setName("");
        setUserEmail("");
        setUserPassword("");
        toast.success("Thanks for signing up", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setName("");
        setUserEmail("");
        setUserPassword("");
        toast.error("Email Already Exists", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      setName("");
      setUserEmail("");
      setUserPassword("");
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
    
  // for getting data from local storage
  useEffect(() => {
    setGetData(JSON.parse(localStorage.getItem("userData")) || []);
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        alignItems="center"
        sx={{ width: "100%", height: "90vh", bgcolor: "#f2f2f2 " }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#52ab98" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography color="#2b6777" component="h1" variant="h5">
              Sign up
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="Name"
                    required
                    fullWidth
                    id="firstName"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive updates via email."
                  />
                </Grid>
              </Grid>
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
                Sign Up
              </Button>
              <ToastContainer />
              <Grid container justifyContent="center">
                <Grid item my="auto">
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
