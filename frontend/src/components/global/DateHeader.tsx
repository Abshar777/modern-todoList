import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const DateHeader = ({
  day,
  formattedDate,
  delay,
  dayIndex,
  currentDate,
}: any) => (
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
);

export default DateHeader;
