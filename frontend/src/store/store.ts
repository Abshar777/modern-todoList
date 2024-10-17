import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import todoSlice from "./todo/todoSlice";

const store=configureStore({
    reducer:{
        Auth:authSlice,
        Todo:todoSlice
    
    }
})


export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store