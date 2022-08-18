// react imports
import React, { useEffect, useState } from "react";

// react router imports
import {Routes,Route} from 'react-router-dom';

// mui import 
import {CssBaseline} from '@mui/material';

// components import 
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import SingleBookData from "./Components/singleBookData/SingleBookData";

// redux imports
import {Provider} from 'react-redux';
import {store} from './app/store';



function App() {

  const [singleBookData,setSingleBookData] = useState([]); // for storing data of one book selected

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
