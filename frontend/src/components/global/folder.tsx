import { motion, useAnimationControls } from "framer-motion";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from "uuid";

import { FormEvent, useEffect, useRef, useState } from "react";

interface props {
  title: string;
  id: number;
  todos: IFolderTodo[];
}

import { ScrollArea } from "@/components/ui/scroll-area";
import { IFolderTodo } from "@/store/folderTodo/type";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { AddTodoInFolder } from "@/store/folderTodo/todoSlice";

const Folder = ({ title, id, todos }: props) => {
  const [toggle, settoggle] = useState(false);
  const toggleAnimate = useAnimationControls();
  const folderAnimate = useAnimationControls();
  const folderRef = useRef<HTMLDivElement>();
  const [Todo, setTodo] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [height, setHeight] = useState(folderRef.current?.clientHeight);
  const todoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (Todo.trim() !== "") {
      dispatch(
        AddTodoInFolder({
          id,
          todo: { id: uuidv4(), title: Todo, completed: false },
        })
      );
      setTodo("");
    }
  };

  useEffect(() => {
    setHeight(folderRef.current?.clientHeight);
  }, [todos]);
  return (
    <motion.div
      layout
      ref={folderRef as any}
      initial="untoggle"
      animate={folderAnimate}
      variants={{
        toggle: { height: "3rem", overflow: "hidden" },
        untoggle: {
          height: height,
          overflow: "hidden",
        },
      }}
      className="w-full folder h-fit relative py-1 max-h-[15rem]  px-1  rounded-lg bg-neutral-950 "
    >
      <div className="header  px-3 py-2 bg-neutral-950 z-10  sticky top-0 w-full flex justify-between items-center">
        <h1 className="text-primary/90 capitalize">{title}</h1>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 100, y: 0, transition: { delay: 1.8 } }}
              >
                <Button
                  variant={"secondary"}
                  className="  p-2  relative   w-[1.4rem] h-[1.4rem] rounded-md active:scale-90 transition-all ease-in-out duration-[.5] "
                >
                  -
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p> options</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 100, y: 0, transition: { delay: 1.9 } }}
              >
                <Button
                  onClick={() => {
                    settoggle(!toggle);
                    if (toggle) {
                      toggleAnimate.start("toggle");
                      folderAnimate.start("untoggle");
                    } else {
                      toggleAnimate.start("untoggle");
                      folderAnimate.start("toggle");
                    }
                  }}
                  variant={"secondary"}
                  className="  p-2  relative  w-[1.4rem] h-[1.4rem] rounded-md active:scale-90 transition-all ease-in-out duration-[.5] "
                >
                  <motion.i
                    initial={"toggle"}
                    animate={toggleAnimate}
                    variants={{
                      toggle: { rotate: 0 },
                      untoggle: { rotate: 180 },
                    }}
                    className="ri-arrow-drop-down-line"
                  ></motion.i>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p> {toggle ? "untoggle" : "toggle"} </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
      <ScrollArea className="w-full relative py-1 z-[0] min-h-fit  h-[80%]">
        {todos.map((e, i) => (
          <motion.div
            key={i}
            draggable={true}
            className="hover:bg-secondary/50 cursor-grabbing w-full  mt-2 px-2 text-sm h-full text-muted-foreground justify-between rounded-md  p-1 flex items-center "
          >
            <Checkbox />
            <p>{e.title}</p>
            <i className="ri-delete-bin-line"></i>
          </motion.div>
        ))}
        <motion.div className=" border-dashed border  mt-2 px-2 text-sm h-full text-muted-foreground rounded-md w-full p-1 flex items-center gap-2">
          <form
            onSubmit={todoSubmit}
            className="w-full h-full flex items-center gap-2"
          >
            <Button
              variant={"ghost"}
              type="submit"
              className="w-[1rem] p-0 h-[1rem] border-muted border flex items-center justify-center  text-muted rounded-sm"
            >
              +
            </Button>
            <input
              value={Todo}
              onChange={(e) => setTodo(e.target.value)}
              required
              type="text"
              className="w-full bg-transparent border-transparent outline-none"
              placeholder="Add Todo"
            />
          </form>
        </motion.div>
      </ScrollArea>
    </motion.div>
  );
};

export default Folder;
