import { addDays } from "date-fns";
import { AnimationControls } from "framer-motion";
import DateHeader from "./DateHeader";
import TimeSlot from "./TimeSlot";
import React, { useContext, useMemo } from "react";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Itodo } from "@/store/todo/type";

interface prop {
  daysOfWeek: string[];
  hoursOfDay: string[];
  startOfCurrentWeek: Date;
  colAnimation: AnimationControls;
  delay: number;
  currentlyAdding: string | null;
  setCurrentlyAdding: React.Dispatch<React.SetStateAction<string | null>>;
}

const WeekGrid = ({
  daysOfWeek,
  hoursOfDay,
  colAnimation,
  delay,
  currentlyAdding,
  setCurrentlyAdding,
}: prop) => {
  const { todo: todos } = useSelector((state: RootState) => state.Todo);
  let starting: any = undefined;

  const { startOfCurrentWeek, getSameDayEvent, getEventOnTime } =
    useContext(DayAndWeekContext) as DayAndWeekContextType;

  return (
    <>
      {daysOfWeek.map((day, dayIndex) => {
        const currentDate = addDays(startOfCurrentWeek, dayIndex);
        const formattedDate = currentDate.getDate();
        const filteredEvents = useMemo(
          () => getSameDayEvent(todos, currentDate),
          [currentDate, todos]
        );

        

        return (
          <div
            key={dayIndex}
            className="flex flex-col  group gg dayHeader w-1/6 h-full transition-all ease-in duration-[.3] rounded-md hover:bg-zinc-900/20"
          >
            <DateHeader
              day={day}
              formattedDate={formattedDate}
              delay={delay}
              dayIndex={dayIndex}
              currentDate={currentDate}
            />

            {hoursOfDay.map((hour: string, hourIndex: number) => {
              let todo = starting as Itodo;
              let nextTodo=todos[currentDate+hoursOfDay[hourIndex+1]]
              if (todos[currentDate + hour]) {
                todo = todos[currentDate + hour];
                starting = todo; 
               
                
              }

         
              return (
                <TimeSlot
               
                  key={hourIndex + startOfCurrentWeek.toString()}
                  hour={hour}
                  formattedDate={formattedDate}
                  currentDate={currentDate}
                  hourIndex={hourIndex}
                  colAnimation={colAnimation}
                  delay={delay}
                  currentlyAdding={currentlyAdding}
                  setCurrentlyAdding={setCurrentlyAdding}
                  day={day}
                  todo={todo ? todo : null}
                  nextTodo={nextTodo}
                />
              );
            })}
            {/*    */}
          </div>
        );
      })}
    </>
  );
};

export default WeekGrid;
