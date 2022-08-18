import { createSlice } from "@reduxjs/toolkit";


// getting data from localstorage
const getData = () => {
    if (localStorage.getItem("userData")) {
        return JSON.parse(localStorage.getItem("userData"));
    }
    else{
        return [];
    }
}
// getting loginUserdata form local storage
const getLoginUserData = () => {
    if (localStorage.getItem("loginUserData")) {
        return JSON.parse(localStorage.getItem("loginUserData"));
    }
    else{
        return [];
    }
}

// user slice
export const userSlice = new createSlice({
    name: 'user',
    initialState:{
        userData : getData(),
        loginUserData : getLoginUserData(),
        userName: '',
        email: '',
        password: '',
    },
    reducers:{
        setUserName: (state,action) => {state.userName = action.payload},
        setEmail: (state,action) => {state.email = action.payload},
        setPassword: (state,action) => {state.password = action.payload},
        setUserData: (state) => {
            state.userData.push(
                {
                    userName: state.userName,
                    email: state.email,
                    password: state.password
                }
            )
        },
        setLocalStorage: (state) => {
            localStorage.setItem('userData', JSON.stringify(state.userData));
        },
        setLoginUserData: (state,action) => {
            state.loginUserData = action.payload;
            localStorage.setItem('loginUserData', JSON.stringify(state.loginUserData));
        },
    }
})

export const {setUserData,setUserName,setEmail,setPassword,setLocalStorage,setLoginUserData} = userSlice.actions;
export default userSlice.reducer;
