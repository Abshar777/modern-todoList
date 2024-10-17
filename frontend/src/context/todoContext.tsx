import { Itodo } from "@/store/todo/type";
import { createContext, useState } from "react";

export interface ItodoConetxt {
    showInfo: Iinfo;
    showModal: Imodal;
    showModalFn: (data: Record<string, any>,callBack:Function) => void;
    closeModalFn: () => void;
    showInfoFn: (data: Itodo) => void;
    closeInfoFn: () => void;
    showEditTodoFn:(data:Itodo,availbleTime:string[])=>void;
    closeEditTodoFn:()=>void
    editTodo:IEdit
}


export interface IEdit {
    open:boolean,
    data:Itodo | Record<string,any>,
    availbleTime:string[]
}

export interface Iinfo {
    open:boolean,
    data:Itodo | Record<string,any>
}

export interface Imodal{
    open:boolean,
    data:Record<string,any>,
    callBack:Function

}

const TodoContext = createContext<ItodoConetxt | undefined>(undefined);

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [showInfo, setShowInfo] = useState<Iinfo>({
        open: false,
        data: {},

    });
    const [showModal, setshowModal] = useState<Imodal>({
        open: false,
        data: {},
        callBack:()=>{}
    });
    const [editTodo, seteditTodo] = useState<IEdit>({
        open: false,
        data: {},
        availbleTime:[]
    });

    const showEditTodoFn = (data: Itodo,availbleTime:string[]) => seteditTodo({ open: true, data,availbleTime });

    const closeEditTodoFn = () => seteditTodo({ ...editTodo, open: false });

    const showModalFn = (data: Record<string, any>,callBack:Function) => setshowModal({ open: true, data,callBack });

    const closeModalFn = () => setshowModal({ ...showModal, open: false });

    const showInfoFn = (data: Itodo) => setShowInfo({ open: true, data });

    const closeInfoFn = () => setShowInfo({ ...showInfo, open: false });

   
  return (
    <TodoContext.Provider
      value={{
        showInfo,
        showModal,
        showModalFn,
        closeModalFn,
        showInfoFn,
        closeInfoFn,
        closeEditTodoFn,
        showEditTodoFn,
        editTodo
      }}
    >
      {children}
    </TodoContext.Provider>
  );


};

export default TodoContext;
