import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from '@mui/material/CircularProgress';
import SingleBookData from "../singleBookData/SingleBookData";

import animation from "./Library-cuate.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Copyright() {
  return (
    <Typography variant="body1" color="text.secondary">
      {'Copyright © '}
        GoodReads Mini Library 
        {' '}
      { new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Home = ({singleBookData,setSingleBookData}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.loginUserData);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [booksData, setBooksData] = useState(JSON.parse(localStorage.getItem("booksData")) || []);

  const booksDataFetch = async (bookName) => {
    const response = await fetch( `https://v1.nocodeapi.com/umar234/gr/vqtDNqNWbnVPMtpD/search?q=${bookName}`);
    const data = await response.json();
    console.log(data)
    setBooksData(data);
    localStorage.setItem("booksData", JSON.stringify(data));
  };

  const searchHandler = () => {
    if(search){
      booksDataFetch(search);
      setSearch('');

    }
    else{
      toast.error('Please enter the book name', {
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

  const onClearHandler = () => {
    setSearch("");
    setBooksData([]);
    localStorage.setItem("booksData", JSON.stringify([]));
  }

  const singleBookDataHandler = (index) => {
    console.log(index)
    console.log(booksData.results[index]);
    setSingleBookData(booksData.results[index]);
    navigate('/singleBookData');

  }

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
        flexWrap='wrap'
        pt={3}
        sx={{flexWrap:{xs:'nowrap'}, minHeight: "20rem", bgcolor: " #c8d8e4",flexDirection:{xs:'column',sm:'row'} }}
      >
        <Typography sx={{fontSize:{xs:'1.8rem',sm:'3rem'},textAlign:{sx:'justify'}}} color="#2b6777 "  variant="h3" component="h1">
          GoodReads Mini Library
        </Typography>
        <StyledImg src={animation} alt="" />
      </Box>
      <Box
        sx={{ minHeight: "20rem", bgcolor: "#52ab98" }}
        display="flex"
        justifyContent="flex-start"
        flexDirection='column'
        alignItems="center"
        paddingY={4}
      >
        <Box width='100vw' display='flex' justifyContent='center' alignItems='center'sx={{flexDirection:{xs:'column',sm:'row'}}}>
        <TextField
          sx={{ bgcolor: "#c8d8e4",width:'20rem', minWidth:'10rem',width:{xs:'19rem'} }}
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
            height: "3.2rem",
            minWidth:'5rem',
            mx: "1rem",
            my:{xs:'1rem'},
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
          booksData['query']
          ?(
            <>

          <Button
          onClick={onClearHandler}
          sx={{
            bgcolor: "#2b6777",
            height: "3.2rem",
            width:'10rem',
            mx: "1rem",
            my:'1rem',
            "&:hover": { bgcolor: "#52ab90" },
          }}
          variant="contained"
        >
          Clear
        </Button>
            
            <Typography mt={2} color='#c8d8e4' variant="h5">Search Results for {booksData.query}
            </Typography>
            <Box>
              {
                booksData.results?.map((book,index) => (
                    <Typography color='#2b6777' sx={{cursor:'pointer',textDecoration:'underline'}} align="center" pt={2} variant="h5" component='h2' key={index} onClick={() => singleBookDataHandler(index)}
                    >
                      {index+1}. {book.title}
                    </Typography>
                ))
              }
            </Box>
            </>
          )
          :(
            <h1></h1>
          )
        }
      </Box>


      <Box display='flex' justifyContent='center' alignItems='center' sx={{height:'5.5rem',bgcolor:'#c8d8e4',width:'100vw'}}>
      <Copyright />
      </Box>
    </Box>
  );
};

export default Home;

const StyledImg = styled("img")`
  width: 500px;
  height: 500px;

  @media (max-width:600px){
    width:400px
  }
`;
