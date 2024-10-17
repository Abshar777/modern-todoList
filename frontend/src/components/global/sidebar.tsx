import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { LogoutUser } from "@/store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {  } from "@radix-ui/react-tooltip";

const Sidebar = () => {
  const navigete = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: RootState) => state.Auth);
  const handleLogout = () => {
    dispatch(LogoutUser());
  };
  const accounts = [
    {
      name: "abshar",
      img: "https://i.pinimg.com/564x/dc/99/f0/dc99f000c9323d9ffbaae6284decfb53.jpg",
    },
  ];
  useEffect(() => {
    if (!userInfo) navigete("/auth/login");
  }, [userInfo]);
  return (
    <motion.div
      initial={{ minWidth: "0%", padding: 0, width: 0 }}
      animate={{
        minWidth: "5rem",
        padding: "1.25rem",
        width: "5rem",
        transition: { delay: 1 },
      }}
      className="h-full overflow-hidden relative min-w-[5rem]  bg-neutral-900/50 py-[1.5rem] p-5 "
    >
      <motion.div
        initial={{ rotate: 360, scale: 0.1 }}
        animate={{ rotate: 0, scale: 1, transition: { delay: 1.1 } }}
        className="rounded-md w-[3rem] h-[3rem] overflow-hidden"
      >
        <svg
          className="w-full h-full object-cover scale-90"
          viewBox="0 0 240 244"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="50" fill="#EA580C" />
          <circle cx="190" cy="50" r="50" fill="#FAFAFA" fill-opacity="0.18" />
          <circle cx="190" cy="194" r="50" fill="#FAFAFA" fill-opacity="0.18" />
          <circle cx="50" cy="194" r="50" fill="#FAFAFA" fill-opacity="0.18" />
        </svg>
      </motion.div>
      <div className="flex flex-col  items-center gap-3 mt-8 w-full">
       
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 100, y: 0, transition: { delay: 1.2 } }}
              >
                <Button
                  variant={"ghost"}
                  className=" after:w-[50%] text-xl hover:after:w-[60%] after:transition-all after:ease-in after:duration-[.5] after:rounded-md p-2 after:top-1 after:h-1 after:absolute relative after:bg-zinc-400 w-[3rem] h-[3rem] rounded-md active:scale-90 transition-all ease-in-out duration-[.5] bg-zinc-900"
                >
                  8
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p> tasks</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 100, y: 0, transition: { delay: 1.25 } }}
              >
                <Button
                  variant={"ghost"}
                  className=" after:w-[0%] text-xl  after:transition-all after:ease-in after:duration-[.5] after:rounded-md p-2 after:top-1 after:h-1 after:absolute relative after:bg-zinc-400 w-[3rem] h-[3rem] rounded-md active:scale-90 transition-all ease-in-out duration-[.5] bg-zinc-900"
                >
                  <i className="ri-inbox-2-fill"></i>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>all tasks</p>
            </TooltipContent>
          </Tooltip>
       
        <Separator orientation="horizontal" className="mb-2" />
        {accounts.map((e, i) => (
       
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 100,
                    y: 0,
                    transition: { delay: 1 + (0.1 * i + 0.3) },
                  }}
                >
                  <Button
                    variant={"ghost"}
                    className="after:w-[0%] text-2xl  after:transition-all after:ease-in after:duration-[.5] after:rounded-md p-2 after:top-1 after:h-1 after:absolute relative after:bg-zinc-400 w-[3rem] h-[3rem] rounded-full flex items-center justify-center active:scale-90 transition-all ease-in-out duration-[.5] bg-zinc-900"
                  >
                    <Avatar>
                      <AvatarImage src={e.img} />
                      <AvatarFallback>
                        {e.name[0] + "" + e.name[1]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{e.name}</p>
              </TooltipContent>
            </Tooltip>
         
        ))}
      
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 100,
                  y: 0,
                  transition: { delay: 1 + (0.1 * accounts.length + 0.3) },
                }}
              >
                <Button
                  variant={"ghost"}
                  className="after:w-[0%] text-2xl  after:transition-all after:ease-in after:duration-[.5] after:rounded-md p-2 after:top-1 after:h-1 after:absolute relative after:bg-zinc-400 w-[3rem] h-[3rem] rounded-full flex items-center justify-center active:scale-90 transition-all ease-in-out duration-[.5] bg-zinc-900"
                >
                  +
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>add</p>
            </TooltipContent>
          </Tooltip>
      
      </div>
      <div className="h-full items-end justify-center content-center ml-1  flex flex-col pb-[5rem]   gap-3 mt-8 w-full">
       
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 100,
                  y: 0,
                  transition: { delay: 1 + (0.1 * accounts.length + 0.4) },
                }}
              >
                <Button
                  variant={"ghost"}
                  className="after:w-[0%] text-2xl  after:transition-all after:ease-in after:duration-[.5] after:rounded-md p-2 after:top-1 after:h-1 after:absolute relative after:bg-zinc-400 w-[3rem] h-[3rem] rounded-full flex items-center justify-center active:scale-90 transition-all ease-in-out duration-[.5] bg-zinc-900"
                >
                  <Avatar>
                    <AvatarImage
                      src={
                        "https://i.pinimg.com/236x/d8/15/63/d81563b7c2f1472a6d57bc7b75b0622d.jpg"
                      }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>name</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 100,
                  y: 0,
                  transition: { delay: 1 + (0.1 * accounts.length + 0.5) },
                }}
              >
                <Dialog>
                  <DialogTrigger className="ring-primary rounded-full outline-primary border-primary">
                    <Button
                      variant={"ghost"}
                      className="after:w-[0%]  text-2xl  after:transition-all after:ease-in after:duration-[.5] after:rounded-md p-2 after:top-1 after:h-1 after:absolute relative after:bg-zinc-400 w-[3rem] h-[3rem] rounded-full flex items-center justify-center active:scale-90 transition-all ease-in-out duration-[.5] bg-zinc-900"
                    >
                      <i className="ri-logout-circle-line"></i>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-background/10 backdrop-blur-lg">
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={handleLogout}
                        className="active:scale-90 transition-all ease-in duration-[.3]"
                        variant={"outline"}
                      >
                        Logout
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>logout</p>
            </TooltipContent>
          </Tooltip>
      
      </div>
    </motion.div>
  );
};

export default Sidebar;
