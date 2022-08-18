import {configureStore} from '@reduxjs/toolkit';
import userSlice from '../Components/Features/userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice
    }
})

