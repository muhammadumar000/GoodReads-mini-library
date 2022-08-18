import React, { useState } from "react";

// MUI imports
import {
  Toolbar,
  AppBar,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import styled from "@emotion/styled";
import { LibraryBooks, LocalLibrary, Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";

// react router imports
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

// redux imports
import { setLoginUserData } from "../Features/userSlice";
import { useSelector, useDispatch } from "react-redux";


const Navbar = () => {

  const userData = useSelector((state) => state.user.loginUserData); // getting data from redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // click handler for menu button
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // function for rendering logout button if user is successfully loginned

  const logoutBtnRender = () => {
    if (userData.length > 0) {
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="1rem"
        >
          <Button
            onClick={logoutHandler}
            sx={{ bgcolor: "#52ab98", "&:hover": { bgcolor: "#2b6777" } }}
            variant="contained"
            endIcon={<Logout />}
          >
            Logout
          </Button>
          <Tooltip title={userData[0].userName}>
            <Avatar
              sx={{
                bgcolor: "#52ab98",
                cursor: "pointer",
                marginRight: "1rem",
              }}
              src="/broken-image.jpg"
            />
          </Tooltip>
        </Box>
      );
    }
  };

  // if user click on logout button

  const logoutHandler = () => {
    dispatch(setLoginUserData([]));
    navigate("/login");
  };


  // for closing the menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  return (
    <Box sx={{ flexGrow: 1, width: "100vw" }}>
      <AppBar position="static" sx={{ bgcolor: "#2b6777" }}>
        <Toolbar>
          <MenuIcon
            size="large"
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            cursor="pointer"
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            PaperProps={{
              sx: {
                marginTop: "1rem",
                width: "10rem",
                backgroundColor: "#2b6777",
              },
            }}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <Linkd to="/">Home</Linkd>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Linkd to="/login">LogIn</Linkd>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Linkd to="/signup">SignUp</Linkd>
            </MenuItem>
          </Menu>
          <Box ml={1} display="flex" sx={{ flexBasis: "100%" }}>
            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Goodreads
            </Typography>
            <LocalLibrary
              size="large"
              sx={{ display: { xs: "block", sm: "none" } }}
            />
            <Box
              mx="auto"
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Linkd to="/">Home</Linkd>
              <Linkd to="/login">LogIn</Linkd>
              <Linkd to="/signup">SignUp</Linkd>
            </Box>
          </Box>
          {logoutBtnRender()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

const Linkd = styled(Link)`
  text-decoration: none;
  padding-inline: 1rem;
  color: #fff;
  font-size: 1.2rem;
  &:hover {
    border-bottom: 2px solid #52ab98;
  }
`;
