import DateAndTimeColRow from "@/components/global/DateAndTimeColRow1";
// import { Button } from "@/components/ui/button";
import { motion, useAnimationControls } from "framer-motion";
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@/components/ui/tooltip";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import EditTodoDailog from "@/components/global/editTodoDailog";
import AddTodoDialog from "@/components/global/addTodoDialog";
import Info from "@/components/global/info";
import ConformModal from "@/components/global/conformModal";

const Dashborad = () => {
  const { handleNextWeek, handlePrevWeek, startOfCurrentWeek } = useContext<
    DayAndWeekContextType | undefined
  >(DayAndWeekContext) as DayAndWeekContextType;
  const [delay, setDelay] = useState(1);
  const arrowAnimate = useAnimationControls();
  const [open, setopen] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDelay(0);
    }, 1500);
    return () => {
      clearTimeout(timeOut);
    };
  });
  return (
    <div className="w-full  h-full bg-background">
      <div className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.1] bg-dot-black/[0.2] relative ">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="nav bg-[#020203]  w-full relative z-[11] py-[1.5rem] px-[2rem] flex items-center justify-between">
          <div className="flex h-fit overflow-hidden items-center gap-3 ">
            <motion.h1
              key={`${startOfCurrentWeek.getMonth()}-${startOfCurrentWeek.getFullYear()}`}
              initial={{ opacity: 0, y: 30 }}
              animate={"anime"}
              variants={{ anime: { opacity: 1, y: 0 } }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                // duration: 1,
                delay: delay + 0.1,
                // ease: Expo.easeInOut,
              }}
              className="text-xl monthAndYear opacity-0 elem translate-y-10"
            >
              {startOfCurrentWeek.toLocaleString("default", {
                month: "long",
              })}{" "}
              {startOfCurrentWeek.getFullYear()}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={"anime"}
              variants={{ anime: { opacity: 1, y: 0 } }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                // duration: 1,
                delay: delay + 0.2,
                // ease: Expo.easeInOut,
              }}
              className="text-xl elem  translate-y-10 "
            >
              /
            </motion.h1>
            <motion.h1
              key={Math.ceil(
                (startOfCurrentWeek.getDate() + startOfCurrentWeek.getDay()) / 7
              )}
              initial={{ opacity: 0, y: 30 }}
              animate={"anime"}
              variants={{ anime: { opacity: 1, y: 0 } }}
              exit={{ opacity: 0, y: -30 }}
              transition={{
                // duration: 1,
                delay: delay + 0.3,
                // ease: Expo.easeInOut,
              }}
              className="text-xl elem  week translate-y-10 group"
            >
              W
              {Math.ceil(
                (startOfCurrentWeek.getDate() + startOfCurrentWeek.getDay()) / 7
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      setopen(!open);
                      if (open) {
                        arrowAnimate.start("toggle");
                      } else {
                        arrowAnimate.start("untoggle");
                      }
                    }}
                    variant={"ghost"}
                    className=" hover:bg-transparent text-2xl -translate-x-3   relative  rounded-md active:scale-90 transition-all ease-in-out duration-[.5] "
                  >
                    <motion.i
                      initial={"toggle"}
                      animate={arrowAnimate}
                      variants={{
                        toggle: { rotate: 0 },
                        untoggle: { rotate: 180 },
                      }}
                      className="ri-arrow-drop-down-line"
                    ></motion.i>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className=" ">
                  <p>pick date</p>
                </TooltipContent>
              </Tooltip>
            </motion.h1>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.i
                    initial={{ opacity: 0, y: 30 }}
                    animate={"anime"}
                    variants={{
                      anime: { opacity: 1, y: 0 },
                      select: { rotate: 180 },
                      init: { rotate: 0 },
                    }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                      // duration: 1,
                      delay: delay + 0.4,
                      // ease: Expo.easeInOut,
                    }}
                    onClick={handlePrevWeek}
                    id="arrow"
                    className="ri-arrow-left-line cursor-pointer elem translate-y-10 text-muted-foreground hover:text-white transition-all ease-in duration-[.3] hover:-translate-x-1"
                  ></motion.i>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>previous week</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.i
                    initial={{ opacity: 0, y: 30 }}
                    animate={"anime"}
                    variants={{ anime: { opacity: 1, y: 0 } }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{
                      // duration: 1,
                      delay: delay + 0.5,
                      // ease: Expo.easeInOut,
                    }}
                    onClick={handleNextWeek}
                    className="ri-arrow-right-line cursor-pointer elem translate-y-10 text-muted-foreground hover:text-white transition-all ease-in duration-[.3] hover:translate-x-1"
                  ></motion.i>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>next week</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="flex ">
            <Tooltip>
              <TooltipTrigger asChild>
                {/* <Button variant={"default"}>share</Button> */}
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <DateAndTimeColRow />
        <EditTodoDailog />
        <AddTodoDialog />
        <ConformModal/>
        <Info />
      </div>
    </div>
  );
};

export default Dashborad;
