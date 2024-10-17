import { PayloadAction } from "@reduxjs/toolkit";
import { Tuser } from "./type";

export const setUser=(state:{userInfo:Tuser | undefined},{payload}:PayloadAction<Tuser>)=>{
    state.userInfo={...payload}
    localStorage.setItem("user",JSON.stringify(payload))
}

export const logoutUser=(state:{userInfo:Tuser | undefined})=>{
    state.userInfo=undefined
    localStorage.removeItem("user")
}