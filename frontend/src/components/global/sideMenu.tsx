import { motion, useAnimationControls } from "framer-motion";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FormEvent, useEffect, useState } from "react";
import Folder from "./folder";
import { ScrollArea } from "../ui/scroll-area";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

interface folder {
  id: string;
  title: string;
  todos: {
    id: string;
    title: string;
    completed: boolean;
  }[];
}

const SideMenu = () => {
  const letter = useAnimationControls();
  const [name, setname] = useState("");
  const [folders, setFolders] = useState<folder[]>([
    {
      id: "1",
      title: "this week",
      todos: [],
    },
  ]);
  const handleNewSection=(e:any)=>{
    setFolders([...folders, {id:Date.now().toString(),title:name,todos:[]}]);
  }
  useGSAP(() => {
    gsap.from(".folder", {
      y: 10,
      opacity: 0,
      duration: 0.5,
      delay: 1.8,
      stagger: 0.2,
    });
  });
  useEffect(() => {
    let i = setTimeout(() => {
      letter.start("first");
    }, 1000);

    return () => {
      clearTimeout(i);
    };
  }, []);
  return (
    <>
   
      <motion.div
        initial={{ minWidth: "0%", padding: 0, width: 0 }}
        animate={{
          minWidth: "20%",
          padding: "1.25rem 0",

          width: "20%",
          transition: { delay: 1.1 },
        }}
        layout
        className="w-[20%] h-screen rounded-tr-lg py-[1.5rem]  rounded-br-lg bg-neutral-900/80"
      >
        <div className=" heder px-5 flex items-center justify-between">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="h-fit overflow-hidden items-center flex md:text-xl text-lg "
          >
            {"Todos".split("").map((e, i) => (
              <motion.span
                initial={{ y: 100, scale: 0.5, opacity: 0, rotate: "90deg" }}
                animate={letter}
                variants={{
                  first: { y: 0, scale: 1, opacity: 1, rotate: "0deg" },
                }}
                transition={{
                  ease: [0.33, 1, 0.68, 1],
                  delay: i * 0.1,
                  type: "spring",
                  bounce: 0.39,
                }}
                key={i}
              >
                {e}
              </motion.span>
            ))}
          </motion.div>
          <div className="flex items-center h-full gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 100, y: 0, transition: { delay: 1.8 } }}
                >
                  <Dialog>
                    <DialogTrigger>
                      <Button
                        variant={"secondary"}
                        className="  p-2  relative  w-[2rem] h-[2rem] rounded-md active:scale-90 transition-all ease-in-out duration-[.5] "
                      >
                        +
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-background/10 ">
                     
                        <DialogHeader>
                          <DialogTitle>Add section </DialogTitle>
                          <DialogDescription>
                            Organize your Todos As Section
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Name
                            </Label>
                            <Input
                              id="name"
                              value={name}
                              onChange={(e) => setname(e.target.value)}
                              className="col-span-3"
                              required
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose>
                          <Button
                          
                          onClick={handleNewSection}
                            type="submit"
                            className="active:scale-90 transition-all ease-in duration-[.3]"
                          >
                            Save changes
                          </Button>
                          </DialogClose>
                        </DialogFooter>

                    </DialogContent>
                  </Dialog>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p> add section</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 100, y: 0, transition: { delay: 1.8 } }}
                >
                  <DropdownMenuTrigger>
                    {" "}
                    <Button
                      variant={"secondary"}
                      className="  p-2  relative  w-[2rem] h-[2rem] rounded-md active:scale-90 transition-all ease-in-out duration-[.5] "
                    >
                      <i className="ri-more-line"></i>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    sideOffset={10}
                    className="w-[10rem] bg-background/40 border border-zinc-900 backdrop-blur-md"
                  >
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        Add Section
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Clear All Section
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Profile
                        <DropdownMenuShortcut></DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    {/* <DropdownMenuSeparator /> */}
                  </DropdownMenuContent>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p> more</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <div className="w-full pt-5 fl h-[80%]   relative ">
          <div className="absolute h-[20%] bottom-0 w-full z-[9] bg-gradient-to-b from-transparent to-[#141414] pointer-events-none"></div>
          <ScrollArea className="w-full overflow-x-visible px-5 h-full fl  ">
            {folders.map((e, i) => (
              <div key={i} className={`w-full  h-fit ${i == 0 && "mt-6"}`}>
                <Folder title={e.title} id={e.id} />
                <div className="mt-3"></div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </motion.div>
     
    </>
  );
};

export default SideMenu;
