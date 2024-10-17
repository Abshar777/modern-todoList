import { motion, useAnimationControls } from "framer-motion";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  
} from "@/components/ui/tooltip";
import { Checkbox } from "@/components/ui/checkbox";

import { FormEvent, LegacyRef, useEffect, useRef, useState } from "react";

interface props {
  title: string;
  id: string;
}

import { ScrollArea } from "@/components/ui/scroll-area";
import {  } from "@radix-ui/react-tooltip";
const Folder = ({ title }: props) => {
  const [toggle, settoggle] = useState(false);
  const toggleAnimate = useAnimationControls();
  const folderAnimate = useAnimationControls();
  const folderRef = useRef<HTMLDivElement>();
  const [Todo, setTodo] = useState("");
  const [array, setArr] = useState([0]);
  const [height, setHeight] = useState(folderRef.current?.clientHeight);
  const todoSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (Todo.trim() !== "") {
      setArr((prev) => [...prev, 0]);
      setTodo("");
    }
  };

  useEffect(() => {
    setHeight(folderRef.current?.clientHeight);
  }, [array]);
  return (
    <motion.div
      layout
      ref={folderRef as any}
      initial="untoggle"
      animate={folderAnimate}
      variants={{
        toggle: { height: "3rem", overflow: "hidden" },
        untoggle: {
          height: folderRef.current?.clientHeight,
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
        {array.map((_, i) => (
          <motion.div
            key={i}
            draggable={true}
            className="hover:bg-secondary/50 cursor-grabbing  mt-2 px-2 text-sm h-full text-muted-foreground rounded-md w-full p-1 flex items-center gap-2"
          >
            <Checkbox />
            <p>do some work</p>
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
