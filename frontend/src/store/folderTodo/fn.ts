import { PayloadAction } from "@reduxjs/toolkit";
import { IFolder, IFolderTodo, TinitialState } from "./type";

export const addFolder = (state: TinitialState, { payload }: PayloadAction<string>) => {
    const obj = { title:payload, todos: [], id: state.folder.length + 1 as number }
    state.folder.push(obj)
    localStorage.setItem("folderTodo", JSON.stringify(state.folder))
}

export const removeFolder = (state: TinitialState, { payload }: PayloadAction<number>) => {
    state.folder = state.folder.filter(e => e.id !== payload)
    localStorage.setItem("folderTodo", JSON.stringify(state.folder))
}

export const addTodoInFolder = (state: TinitialState, { payload }: PayloadAction<{ id: number, todo: IFolderTodo }>) => {
    state.folder = state.folder.map(e => e.id === payload.id ? { ...e, todos: [...e.todos, payload.todo] } : e);
    localStorage.setItem("folderTodo", JSON.stringify(state.folder));
}

export const removeTodoInFolder = (state: TinitialState, { payload }: PayloadAction<{ id: number, todoId: string }>) => {
    state.folder = state.folder.map(e => e.id === payload.id ? { ...e, todos: e.todos.filter(todo => todo.id !== payload.todoId) } : e);
    localStorage.setItem("folderTodo", JSON.stringify(state.folder));
}

export const completeTodoInFolder = (state: TinitialState, { payload }: PayloadAction<{ id: number, todoId: string }>) => {
    state.folder = state.folder.map(e => e.id === payload.id ? { ...e, todos: e.todos.map(todo => todo.id === payload.todoId ? { ...todo, completed: true } : todo) } : e);
    localStorage.setItem("folderTodo", JSON.stringify(state.folder));
}
export const notCompleteTodoInFolder = (state: TinitialState, { payload }: PayloadAction<{ id: number, todoId: string }>) => {
    state.folder = state.folder.map(e => e.id === payload.id ? { ...e, todos: e.todos.map(todo => todo.id === payload.todoId ? { ...todo, completed: false } : todo) } : e);
    localStorage.setItem("folderTodo", JSON.stringify(state.folder));
}