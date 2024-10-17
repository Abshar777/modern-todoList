import { PayloadAction } from "@reduxjs/toolkit";
import { Itodo } from "./type";


export const addTodo = (state: {todo:Record<string,Itodo>,currentTodo:Itodo| any}, { payload }: PayloadAction<Itodo>) => {
    if (payload.id) state.todo[payload.id] = payload;
    localStorage.setItem("todo", JSON.stringify(state.todo))
}

export const removeTodo = (state: {todo:Record<string,Itodo>,currentTodo:Itodo| any}, { payload }: PayloadAction<string>) => {
    delete state.todo[payload];
    localStorage.setItem("todo", JSON.stringify(state.todo))
}

export const setCurrentTodo = (state: {todo:Record<string,Itodo>,currentTodo:Itodo| any}, { payload }: PayloadAction<Itodo>) => {
     state.currentTodo=payload;
}

export const editTodo = (state: {todo:Record<string,Itodo>,currentTodo:Itodo| any}, { payload }: PayloadAction<Itodo | any>) => {
    if (payload.Pid && state.todo[payload.Pid]) {
        delete state.todo[payload.Pid];
        state.todo[payload.id] = payload;
        localStorage.setItem("todo", JSON.stringify(state.todo));
    }
}