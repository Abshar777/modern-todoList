import { createSlice } from "@reduxjs/toolkit";
import { TinitialState } from "./type";
import { addFolder, removeFolder, addTodoInFolder, removeTodoInFolder, completeTodoInFolder, notCompleteTodoInFolder } from "./fn";

const folder = window.localStorage.getItem("folderTodo") || ""

const initialState: TinitialState = {
  folder: folder ? JSON.parse(folder) : [ {
    id: "1",
    title: "this week",
    todos: [],
  }],
}

const folderTodo = createSlice({
  name: "folderTodo",
  initialState,
  reducers: {
    AddFolder: addFolder,
    RemoveFolder: removeFolder,
    AddTodoInFolder: addTodoInFolder,
    RemoveTodoInFolder: removeTodoInFolder,
    CompleteTodoInFolder: completeTodoInFolder,
    NotCompleteTodoInFolder: notCompleteTodoInFolder,
  }
})

export const {AddFolder,AddTodoInFolder,CompleteTodoInFolder,NotCompleteTodoInFolder,RemoveFolder,RemoveTodoInFolder} = folderTodo.actions
export default folderTodo.reducer