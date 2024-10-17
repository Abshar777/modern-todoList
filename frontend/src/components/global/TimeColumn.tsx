import { motion } from "framer-motion";
import { LegacyRef } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
} from "../ui/context-menu";


import { useContext } from "react";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import { addDays } from "date-fns";

const TimeColumn = ({
  hoursOfDay,
  delay,
  rowRef,
}: {
  hoursOfDay: string[];
  delay: number;
  rowRef: LegacyRef<HTMLDivElement>;
}) => {
  const { setSelectedTimeFn,dailogStateChange,startOfCurrentWeek } = useContext<
    DayAndWeekContextType | undefined
  >(DayAndWeekContext) as DayAndWeekContextType;
  return (
    <div className="w-[5rem] time-row h-full flex flex-col">
      <div className="w-full h-[7rem] hover:bg-[#100e0e] transition-all ease-in duration-[.3] sticky top-0 bg-[#020203]"></div>
      {hoursOfDay.map((hour, hourIndex) => (
        <ContextMenu
          key={hourIndex + "" + hour}
          onOpenChange={(open) => {
            
            open ? setSelectedTimeFn(hourIndex) : setSelectedTimeFn(-1);
          }}
        >
          <ContextMenuTrigger className="w-full h-full ">
            <motion.div
              ref={rowRef as LegacyRef<HTMLDivElement> | undefined}
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
          </ContextMenuTrigger>
          <ContextMenuContent className="scale-[.9] bg-background/90 border border-zinc-900 ">
            <ContextMenuItem
              onSelect={(e) => {
                e.preventDefault();
                const currentDate=addDays(startOfCurrentWeek,0)
                dailogStateChange(hour,hourIndex,currentDate,true)
              }}
            >
          add
            </ContextMenuItem>
            <ContextMenuItem disabled>info</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
};

export default TimeColumn;
