import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ScrollArea } from "../ui/scroll-area";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import TimeColumn from "./TimeColumn";
import WeekGrid from "./weekGrid";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const DateAndTimeColRow = () => {
  const [delay, setDelay] = useState(1.3);
  const [currentlyAdding, setCurrentlyAdding] = useState<string | null>(null);
  const colAnimation = useAnimationControls();
  const rowRef = useRef<HTMLDivElement>(null);

  const { startOfCurrentWeek, selectedTime } = useContext(
    DayAndWeekContext
  ) as DayAndWeekContextType;
  const [week, _] = useState(
    Math.ceil((startOfCurrentWeek.getDate() + startOfCurrentWeek.getDay()) / 7)
  );

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
      Array.from(
        { length: 24 },
        (_, i) => `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? "AM" : "PM"}`
      ),
    []
  );
  

  const handleMouseEnter = (i: number) =>
    gsap.to(`.hours-row-${i}-${week}`, { backgroundColor: "#1c1c1c" });
  const handleMouseLeave = (i: number) =>
    gsap.to(`.hours-row-${i}-${week}`, { backgroundColor: "transparent" });


  useGSAP(()=>{
    const rows = document.querySelectorAll(".mainHour");
    rows.forEach((row, i) => {
      row.addEventListener("mouseenter", () => handleMouseEnter(i));
      row.addEventListener("mouseleave", () => handleMouseLeave(i));
    });
  },{revertOnUpdate:true})

  useGSAP(
    () => {
      gsap.to(`.hours-row-${selectedTime}-${week}`, {
        borderBottom: "1px dashed #ffff",
        borderTop: "1px dashed #ffff",
      });
    },
    { dependencies: [selectedTime], revertOnUpdate: true }
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
    colAnimation.start("animate");
  }, [startOfCurrentWeek]);

  return (
    <div className="w-full pb-24 h-full relative flex flex-col">
     
      <ScrollArea className="w-full  relative h-full">
        <div className="flex h-full  w-full relative">
          <TimeColumn hoursOfDay={hoursOfDay} delay={delay} rowRef={rowRef} />
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: "100%",
              transition: { delay: delay + 0.2, duration: 0.5 },
            }}
            className="w-full h-[1px] fixed translate-y-28 bg-primary z-10"
          />
          <WeekGrid
            daysOfWeek={daysOfWeek}
            hoursOfDay={hoursOfDay}
            startOfCurrentWeek={startOfCurrentWeek}
            colAnimation={colAnimation}
            delay={delay}
            currentlyAdding={currentlyAdding}
            setCurrentlyAdding={setCurrentlyAdding}
          />
        </div>
      </ScrollArea>
    </div>
  );
};

export default DateAndTimeColRow;
