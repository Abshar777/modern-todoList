import { createSlice } from "@reduxjs/toolkit";
import { Tuser } from "./type";
import { logoutUser, setUser } from "./fn";

const user=window.localStorage.getItem("user") || ""

const initialState:{userInfo:Tuser | undefined}={
    userInfo:user?JSON.parse(user):undefined,

}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        SetUser:setUser,
        LogoutUser:logoutUser
    }
})

export const {SetUser,LogoutUser}= authSlice.actions
export default authSlice.reducer