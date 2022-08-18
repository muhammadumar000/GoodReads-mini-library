import React, { useEffect, useState } from "react";
// 
import {CssBaseline} from '@mui/material';
import {Routes,Route} from 'react-router-dom';
// 
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import {Provider} from 'react-redux';
import {store} from './app/store';
import SingleBookData from "./Components/singleBookData/SingleBookData";


function App() {
  const [singleBookData,setSingleBookData] = useState([]);
  return(
    <CssBaseline>
      
      <Provider store={store} >
      <Navbar />
        <Routes>
          <Route path="/" element={<Home singleBookData={singleBookData} setSingleBookData={setSingleBookData} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/singleBookData" element={<SingleBookData bookData = {singleBookData} />} />
        </Routes>
      </Provider>
    
    </CssBaseline>
  )
}

export default App;
