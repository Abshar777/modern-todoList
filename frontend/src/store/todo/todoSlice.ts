import { createSlice } from "@reduxjs/toolkit";
import { Itodo } from "./type";
import { addTodo, editTodo, removeTodo, setCurrentTodo } from "./fn";


const todo=window.localStorage.getItem("todo") || ""

const initialState:{todo:Record<string,Itodo>,currentTodo:Itodo| any}={
  todo:todo?JSON.parse(todo):{},
  currentTodo:undefined,

}

const todoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{
      Addtodo:addTodo,
      RemoveTodo:removeTodo,
      SetCurrentTodo:setCurrentTodo,
      EditTodo:editTodo
    }
})

export const {Addtodo,RemoveTodo,SetCurrentTodo,EditTodo}= todoSlice.actions
export default todoSlice.reducer