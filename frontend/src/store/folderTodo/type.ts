export interface IFolder {
    id: number;
    title: string;
    todos: IFolderTodo[];
}

export interface IFolderTodo {
    id: string;
    title: string;
    completed: boolean;
}


export type TinitialState = { folder: IFolder[] }