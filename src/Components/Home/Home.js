// react imports
import React, { useEffect, useState } from "react";
// redux import
import { useDispatch, useSelector } from "react-redux";
// react router imports
import { useNavigate } from "react-router-dom";

// MUI imports
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

// components imports
import SingleBookData from "../singleBookData/SingleBookData";
import animation from "./Library-cuate.svg";

// react toastify imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// copyright component
function Copyright() {
  return (
    <Typography variant="body1" color="text.secondary">
      {"Copyright © "}
      GoodReads Mini Library {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Home = ({ singleBookData, setSingleBookData }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.loginUserData); // getting data from redux store
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = useState(null);
  const [search, setSearch] = useState("");
  const [booksData, setBooksData] = useState(
    JSON.parse(localStorage.getItem("booksData")) || []
  ); // getting data from localStorage

  // function for fetching data from api endpoint
  const booksDataFetch = async (bookName) => {
    try{
      setIsLoading(true);
      const response = await fetch(
        `https://v1.nocodeapi.com/umar234/gr/vqtDNqNWbnVPMtpD/search?q=${bookName}`
      );
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      setBooksData(data);
      localStorage.setItem("booksData", JSON.stringify(data)); // saving data to local storage
    }
    catch(err){
      alert('Something Went Wrong');
    }
  };

  // onSearch function
  const searchHandler = () => {
    if (search) {
      booksDataFetch(search);
      setSearch("");
    } else {
      toast.error("Please enter the book name", {
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

  // clear button function => removes all the data fetched...

  const onClearHandler = () => {
    setSearch("");
    setBooksData([]);
    localStorage.setItem("booksData", JSON.stringify([]));
  };

  // this function is use  when user want to see single book details...

  const singleBookDataHandler = (index) => {
    console.log(index);
    console.log(booksData.results[index]);
    setSingleBookData(booksData.results[index]);
    navigate("/singleBookData");
  };
 // function for rendering table
  const renderTable = () => {
    if(isLoading){
      return <CircularProgress sx={{marginTop:'3rem'}} /> 
    }
    else{
      if(booksData["query"] ){
        return (
          <>
          <Button
                onClick={onClearHandler}
                sx={{
                  bgcolor: "#2b6777",
                  height: "2.3rem",
                  width: "10rem",
                  mx: "1rem",
                  my: "1rem",
                  "&:hover": { bgcolor: "#52ab90" },
                }}
                variant="contained"
              >
                Clear
              </Button>
              <Typography
                sx={{ fontSize: { sm: "1.8rem", xs: "1.4rem" } }}
                my={2}
                color="#2b6777"
                variant="h4"
              >
                Search Results for {booksData.query}
              </Typography>
              <TableContainer
                sx={{
                  width: { sm: "70rem", xs: "23rem" },
                  padding: { sm: "5rem", xs: "1rem" },
                  bgcolor: "#c8d8e4",
                }}
                component={Paper}
              >
                <Table sx={{ Width: 450 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontSize: { sm: "1rem", xs: "0.8rem" } }}>
                        Sr. No#
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: { sm: "1.5rem", xs: "1.1rem" } }}
                        align="left"
                      >
                        Book Name
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {booksData.results?.map((book, index) => (
                      <TableRow
                        key={index}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell color="#2b6777" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            color="#2b6777"
                            sx={{
                              cursor: "pointer",
                              fontSize: { sm: "1.2rem", xs: "1rem" },
                            }}
                            align="left"
                            pt={2}
                            variant="h5"
                            component="h2"
                            key={index}
                            onClick={() => singleBookDataHandler(index)}
                          >
                            {book.title}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </>
        )
      }
    }
  }

  // this useEffect is used for functionality that access of home page is  blocked until user Logins..

  useEffect(() => {
    if (!(userData.length > 0)) {
      navigate("/login");
    }
  }, []);

  return (
    <Box sx={{ width: "100vw", minHeight: "91.9vh" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        flexWrap="wrap"
        pt={3}
        sx={{
          flexWrap: { xs: "nowrap" },
          minHeight: "20rem",
          bgcolor: " #c8d8e4",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "1.8rem", sm: "3rem" },
            textAlign: { sx: "justify" },
          }}
          color="#2b6777 "
          variant="h3"
          component="h1"
        >
          GoodReads Mini Library
        </Typography>

        <StyledImg src={animation} alt="" />
      </Box>
      <Box
        sx={{ minHeight: "20rem", bgcolor: "#52ab98" }}
        display="flex"
        justifyContent="flex-start"
        flexDirection="column"
        alignItems="center"
        paddingY={4}
      >
        <Box
          width="100vw"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ flexDirection: { xs: "column", sm: "row" } }}
        >
          <TextField
            sx={{
              bgcolor: "#c8d8e4",
              width: "20rem",
              minWidth: "10rem",
              width: { xs: "19rem" },
            }}
            id="filled-basic"
            label="Search"
            placeholder="Search..."
            variant="filled"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={searchHandler}
            sx={{
              bgcolor: "#2b6777",
              height: { sm: "3.2rem", xs: "2.3rem" },
              minWidth: "5rem",
              mx: "1rem",
              my: { xs: "1rem" },
              "&:hover": { bgcolor: "#52ab90" },
            }}
            variant="contained"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>

          <ToastContainer />
        </Box>

        {
          renderTable()
        }
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: "5.5rem", bgcolor: "#c8d8e4", width: "100vw" }}
      >
        <Copyright />
      </Box>
    </Box>
  );
};

export default Home;

const StyledImg = styled("img")`
  width: 500px;
  height: 500px;

  @media (max-width: 600px) {
    width: 400px;
  }
`;
