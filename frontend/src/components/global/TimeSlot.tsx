import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useContext, useState } from "react";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import TodoContext, { ItodoConetxt } from "@/context/todoContext";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { RemoveTodo } from "@/store/todo/todoSlice";
import { Itodo } from "@/store/todo/type";

const TimeSlot = ({
  hour,
  currentDate,
  hourIndex,
  colAnimation,
  delay,
  currentlyAdding,
  setCurrentlyAdding,
  day,
  todo,
  availbleTime,
  nextTodo,
}: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const dltTodo = (todo: Itodo) => {
    dispatch(RemoveTodo(todo.id as string));
  };


  const { startOfCurrentWeek, dailogStateChange, hoursOfDay } = useContext<
    DayAndWeekContextType | undefined
  >(DayAndWeekContext) as DayAndWeekContextType;
  const { showInfoFn, showEditTodoFn, showModalFn } = useContext<
    ItodoConetxt | undefined
  >(TodoContext) as ItodoConetxt;
  const [week, _] = useState(
    Math.ceil((startOfCurrentWeek.getDate() + startOfCurrentWeek.getDay()) / 7)
  );
  return (
    <motion.div
      initial={{ width: 0, padding: 0, transformOrigin: "right" }}
      animate={colAnimation}
      variants={{ animate: { width: "100%", padding: "0" } }}
      transition={{ delay: delay + 0.1 * hourIndex }}
      exit={{ width: 0, transformOrigin: "left", padding: 0 }}
      key={hourIndex + startOfCurrentWeek.toString()}
      className={`flex min-h-[2rem] overflow-hidden h-[3rem] max-h-[3rem]  hours-row-${hourIndex}-${week} ${
        todo &&
        hourIndex >= hoursOfDay.indexOf(todo.starting) &&
        hourIndex <= hoursOfDay.indexOf(todo.ending) &&
        currentDate.toString() === todo.date.toString()
          ? ""
          : "border-b "
      }  boder-muted/80  justify-center items-center transition-all p-1 ease-in duration-[.3] `}
    >
         <ContextMenu
         modal
        onOpenChange={(open) => {
          if (open) setCurrentlyAdding(hourIndex + day);
          else setCurrentlyAdding(null);
        }}
      >
        <ContextMenuTrigger  className="w-full h-full ">
        
            <Tooltip>
              <TooltipTrigger className="w-full h-full">
                <div 
                onClick={()=>{
                  showInfoFn(todo);
                }}
              
              
                  className={`w-full h-full flex rounded-lg ${
                    currentlyAdding == hourIndex + day &&
                    "border border-dashed bg-zinc-900/30"
                  } hover:bg-zinc-900/30 transition-all px-3 ease-in duration-[.2]  `}
                >
                  {todo &&
                    hourIndex >= hoursOfDay.indexOf(todo.starting) &&
                    hourIndex <= hoursOfDay.indexOf(todo.ending) &&
                    currentDate.toString() === todo.date.toString() && (
                      <div
                        style={{ backgroundColor: todo.color }}
                        className={`w-full ${
                          hourIndex == hoursOfDay.indexOf(todo.starting) &&
                          "rounded-t-2xl"
                        } ${
                          hourIndex == hoursOfDay.indexOf(todo.ending) &&
                          "rounded-b-2xl"
                        }
                      ${nextTodo && "rounded-b-2xl"}
                       h-full ${
                         todo.color ?? "bg-violet-700"
                       } flex flex-col items-start resize-y    px-3 `}
                      >
                        {todo &&
                          hourIndex == hoursOfDay.indexOf(todo.starting) && (
                            <>
                              <h1 className=" scale-[.8] text-start leading-normal">
                                {todo.name} <br />{" "}
                                <span className="text-sm text-start text-white/70 -translate-y-2 ">
                                  {todo.starting}
                                </span>
                              </h1>
                            </>
                          )}
                      </div>
                    )}
                </div>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="scale-[.8] backdrop-blur-sm bg-zinc-900/70  z-[999999]"
              >
                <p className="text-sm w-full font-thin">
                  Right click here for more
                </p>
              </TooltipContent>
            </Tooltip>
        
        </ContextMenuTrigger>
        <ContextMenuContent className="scale-[.9] bg-background/90 border border-zinc-900 ">
          {todo &&
          hourIndex >= hoursOfDay.indexOf(todo.starting) &&
          hourIndex <= hoursOfDay.indexOf(todo.ending) &&
          currentDate.toString() === todo.date.toString() ? (
            <>
              <ContextMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  showInfoFn(todo);
                }}
              >
                info
              </ContextMenuItem>
              <ContextMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  showEditTodoFn(todo, availbleTime);
                }}
              >
                edit
              </ContextMenuItem>
              <ContextMenuItem
                className="cursor-pointer"
                onSelect={(e) => {
                  e.preventDefault();
                  showModalFn(todo, dltTodo);
                }}
              >
                delete
              </ContextMenuItem>
            </>
          ) : (
            <>
              <ContextMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  dailogStateChange(hour, hourIndex, currentDate);
                }}
              >
                add
              </ContextMenuItem>
              <ContextMenuItem disabled>select</ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>
    </motion.div>
  );
};

export default TimeSlot;
