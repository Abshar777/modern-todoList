import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import todoSlice from "./todo/todoSlice";
import folderTodo from "./folderTodo/todoSlice"

const store=configureStore({
    reducer:{
        Auth:authSlice,
        Todo:todoSlice,
        FolderTodo:folderTodo
    }
})


export type RootState=ReturnType<typeof store.getState>;
export type AppDispatch=typeof store.dispatch;
export default store