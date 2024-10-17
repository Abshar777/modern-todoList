import {
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { addDays } from "date-fns";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,

  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, useAnimationControls } from "framer-motion";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import gsap from "gsap";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const DateAndTimeColRow = () => {
  const [delay, setDelay] = useState(1.3);
  const colAnimtion = useAnimationControls();
  const [currentlyAdding, setcurrentlyAdding] = useState<string | null>(null);
  const [name, setname] = useState("");
  const [start, setStart] = useState(new Date().toLocaleTimeString());

  const row = useRef<HTMLDivElement>(null);

  const { startOfCurrentWeek, colors } = useContext<
    DayAndWeekContextType | undefined
  >(DayAndWeekContext) as DayAndWeekContextType; 

  const daysOfWeek = useMemo(
    () => [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    []
  );

  const hoursOfDay = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const ampm = i < 12 ? "AM" : "PM";
        return `${hour} ${ampm}`;
      }),
    []
  );

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDelay(0);
    }, 1200);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    const handleMouseEnter = (i: number) => {
      gsap.to(`.hours-row-${i}`, {
        backgroundColor: "#1c1c1c",
      });
    };

    const handleMouseLeave = (i: number) => {
      gsap.to(`.hours-row-${i}`, {
        backgroundColor: "transparent",
      });
    };

    document.querySelectorAll(".mainHour").forEach((e, i) => {
      e.addEventListener("mouseenter", () => handleMouseEnter(i));
      e.addEventListener("mouseleave", () => handleMouseLeave(i));
    });

    return () => {
      document.querySelectorAll(".mainHour").forEach((e, i) => {
        e.removeEventListener("mouseenter", () => handleMouseEnter(i));
        e.removeEventListener("mouseleave", () => handleMouseLeave(i));
      });
    };
  }, []);

  useEffect(() => {
    colAnimtion.start("animate");
  }, [startOfCurrentWeek]);

  return (
    <div className="w-full h-full relative z-[9] flex flex-col">
      <ScrollArea className="w-full pb-[6rem] relative h-full">
        <div className="flex h-full w-full relative">
            {/*start time collumen */}
          <div className="w-[5rem] time-row h-full flex flex-col">
            <div className="w-full h-[7rem] hover:bg-[#100e0e] transition-all ease-in duration-[.3] sticky top-0 bg-[#020203]"></div>
            {hoursOfDay.map((hour, hourIndex) => (
              <motion.div
                ref={row as LegacyRef<HTMLDivElement> | undefined}
                initial={{ width: 0, padding: "0 0" }}
                animate={{
                  width: "100%",
                  padding: "0 0.5rem",
                  transition: { delay: delay },
                }}
                key={hourIndex}
                className="flex overflow-hidden mainHour transition-all ease-in duration-[.3] hover:bg-zinc-900/30 min-h-[2rem] cursor-pointer px-2 h-[3rem] border-r max-h-[3rem] justify-end items-center border-b"
              >
                <span className="text-sm text-muted-foreground">{hour}</span>
              </motion.div>
            ))}
          </div>
          {/*end time collumen  */}
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: "100%",
              transition: { delay: delay + 0.2, duration: 0.5 },
            }}
            className="w-full h-[1px] fixed translate-y-[7rem] bg-primary z-[999]"
          ></motion.div>
          {/* start week grid */}
          {daysOfWeek.map((day, dayIndex) => {
            const currentDate = addDays(startOfCurrentWeek, dayIndex);
            const formattedDate = currentDate.getDate();

            return (
              <div
                key={dayIndex}
                className="flex flex-col group gg dayHeader w-1/6 transition-all ease-in duration-[.3] rounded-md hover:bg-zinc-900/20"
              >
                <div className="text-center min-h-[7rem] overflow-hidden max-h-[7rem] flex   transition-all ease-in duration-[.3] cursor-pointer flex-col justify-center items-center sticky top-0 bg-[#020203] z-10">
              
                  <Tooltip>
                    <TooltipTrigger className="w-full h-full">
                      <div className="text-center hover:bg-[#100e0e] group rounded-t-md p-3 w-full h-full flex cursor-pointer flex-col justify-center items-center">
                        <motion.h1
                          key={formattedDate}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: delay + dayIndex * 0.1 },
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          className="font-medium group-hover:text-primary text-3xl text-muted-foreground bg-clip-text hover:text-white bg-gradient-to-b from-neutral-200 to-neutral-500"
                        >
                          {formattedDate}
                        </motion.h1>
                        <motion.p
                          key={formattedDate + "."}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: delay + dayIndex * 0.1 },
                          }}
                          exit={{ opacity: 0, y: -20 }}
                          className="group-hover:text-primary hover:text-white text-muted-foreground"
                        >
                          {day.slice(0, 3)}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            transition: { delay: delay + dayIndex * 0.1 },
                          }}
                          exit={{ opacity: 0 }}
                          className="w-[1px] h-5 bg-zinc-900 my-2"
                        ></motion.div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="scale-[.8] absolute right-[50%] top-2 z-[999999]"
                    >
                      <p className="text-sm font-thin">
                        {currentDate.toLocaleDateString()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  
                </div>

                {hoursOfDay.map((hour, hourIndex) => (
                  <motion.div
                    initial={{ width: 0, padding: 0, transformOrigin: "right" }}
                    animate={colAnimtion}
                    variants={{ animate: { width: "100%", padding: "0" } }}
                    transition={{ delay: delay + 0.1 * hourIndex }}
                    exit={{ width: 0, transformOrigin: "left", padding: 0 }}
                    key={hourIndex + startOfCurrentWeek.toString()}
                    className={`flex min-h-[2rem] overflow-hidden h-[3rem] max-h-[3rem] hours-row-${hourIndex} ${
                      hourIndex >= 4 && hourIndex <= 12 && formattedDate == 25
                        ? "border-violet-700/60"
                        : "border-muted/80"
                    }  justify-center items-center transition-all p-1 ease-in duration-[.3] border-b border-zinc-800`}
                  >
                    <ContextMenu
                      modal={true}
                      onOpenChange={(open) => {
                        console.log(open);
                        if (open) setcurrentlyAdding(hourIndex + day);
                        else setcurrentlyAdding(null);
                      }}
                    >
                      <ContextMenuTrigger className="w-full h-full ">
                        <Tooltip>
                          <TooltipTrigger className="w-full h-full">
                            <div
                              className={`w-full h-full flex rounded-lg ${
                                currentlyAdding == hourIndex + day &&
                                "border border-dashed bg-zinc-900/30"
                              } hover:bg-zinc-900/30 transition-all ease-in duration-[.2]  `}
                            >
                              {hourIndex >= 4 &&
                                hourIndex <= 12 &&
                                currentDate.toDateString() ===
                                  new Date().toDateString() && (
                                  <div
                                    className={`w-full ${
                                      hourIndex == 4 && "rounded-t-2xl"
                                    } ${
                                      hourIndex == 12 && "rounded-b-2xl"
                                    } h-full bg-violet-700`}
                                  ></div>
                                )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="top"
                            className="scale-[.8] backdrop-blur-none  z-[999999]"
                          >
                            <p className="text-sm w-full font-thin">
                              Right click here for more
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </ContextMenuTrigger>
                      <ContextMenuContent className="scale-[.9] bg-background/90 border border-zinc-900 ">
                        <ContextMenuItem
                          onSelect={(e) => {
                            e.preventDefault();
                          }}
                        >
                          {/* add todo dialog */}
                          <Dialog>
                            <DialogTrigger className="w-full h-full text-start">
                              {" "}
                              Add
                            </DialogTrigger>
                            <DialogContent className="rounded-md bg-background/70 ">
                              <DialogHeader>
                                <DialogTitle>Add section </DialogTitle>
                                <DialogDescription>
                                  Organize your Todos As Section
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className=" flex  items-center gap-4">
                                  <Label htmlFor="name" className="text-right">
                                    Name
                                  </Label>
                                  <Input
                                    placeholder="Enter section name"
                                    value={name}
                                    onChange={(e) => setname(e.target.value)}
                                    autoComplete="name"
                                    id="name"
                                    className="col-span-3"
                                    required
                                  />
                                </div>
                                <div className=" flex  items-center gap-4">
                                  <Label htmlFor="start" className="text-right">
                                    starting
                                  </Label>
                                  <Input
                                    disabled
                                    placeholder="Enter section name"
                                    value={hour}
                                    onChange={(e) => setStart(e.target.value)}
                                    id="start"
                                    className="col-span-3"
                                    required
                                    // type="time"
                                  />
                                  <Label htmlFor="end" className="text-right">
                                    ending
                                  </Label>
                                  <Select>
                                    <SelectTrigger >
                                      <SelectValue placeholder={hour} />
                                    </SelectTrigger>
                                    <SelectContent className="max-h-[15rem]">
                                      {[...hoursOfDay].splice(hourIndex,hoursOfDay.length-1).map((hour, index) => (
                                        <SelectItem key={index} value={hour}>
                                          {hour}
                                        </SelectItem>
                                      ))}
                                      
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="flex gap-1 md:justify-start justify-center w-full p-3">
                                  {colors.map((e) => (
                                    <div
                                      style={{ backgroundColor: e }}
                                      className={`rounded-full   cursor-pointer bg-[${e}] w-[2rem] h-[2rem]`}
                                    ></div>
                                  ))}
                                </div>
                              </div>
                              <DialogFooter>
                                <DialogClose>
                                  <Button className="active:scale-90 transition-all ease-in duration-[.3]">
                                    Save changes
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          {/*end  add todo dialog */}
                        </ContextMenuItem>
                        <ContextMenuItem>Select</ContextMenuItem>
                      </ContextMenuContent>
                    </ContextMenu>
                  </motion.div>
                ))}
              </div>
            );
          })}
          {/* end week grid */}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DateAndTimeColRow;
