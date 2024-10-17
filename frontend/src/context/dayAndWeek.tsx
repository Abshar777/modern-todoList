import { Itodo } from "@/store/todo/type";
import { addDays, startOfWeek, differenceInCalendarWeeks } from "date-fns";
import { createContext, useMemo, useState } from "react";

export interface DayAndWeekContextType {
  currentWeek: number;
  startOfCurrentWeek: Date;
  handleNextWeek: () => void;
  handlePrevWeek: () => void;
  goToWeekOfDate: (date: Date) => void;
  colors: string[];
  selectedTime: number;
  setSelectedTimeFn: (i: number) => any;
  showDialog: dailogState;
  starting: Itodo | undefined;
  dailogStateChange: (
    starting: string,
    startIndex: number,
    date: Date,
    endDisbled?: boolean
  ) => void;
  closeDailog: () => void;
  setstartingFn: (data: Itodo) => void;
  hoursOfDay: string[];
  filterAvailableTimes:  (events: Itodo[],event?:Itodo) => string[];
  getSameDayEvent: (events: Record<string, Itodo>, currentDay: Date) => Itodo[];
  getEventOnTime:(time:string,eventDate:Itodo[])=>Itodo | undefined
}

interface dailogState {
  open: boolean;
  starting: string;
  startIndex: number;
  endDisbled?: boolean;
  date: Date;
  name?: string;
}

const colors = [
  "#6D28D9",
  "#71717A",
  "#0EA5E9",
  "#EF4444",
  "#10B981",
  "#EAB308",
  "#F97316",
  // "#06B6D4",
  "#6366F1",
  "#EC4899",
];

const DayAndWeekContext = createContext<DayAndWeekContextType | undefined>(
  undefined
);

export const DayAndWeekProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number>(-1);
  const [starting, setstarting] = useState<Itodo>();
  const [showDialog, setShowDailog] = useState<dailogState>({
    open: false,
    starting: "0pm",
    startIndex: 0,
    endDisbled: false,
    date: new Date(),
    name: "",
  });

  const handleNextWeek = () => setCurrentWeek(currentWeek + 1);
  const handlePrevWeek = () => setCurrentWeek(currentWeek - 1);

  const getStartOfWeek = (weekOffset: number) => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 0 });
    return addDays(start, weekOffset * 7);
  };

  const goToWeekOfDate = (date: Date) => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 0 });
    const weekOffset = differenceInCalendarWeeks(date, start);
    setCurrentWeek(weekOffset);
  };

  const startOfCurrentWeek = getStartOfWeek(currentWeek);

  const setSelectedTimeFn = (i: number) => setSelectedTime(i);

  const dailogStateChange = (
    starting: string,
    startIndex: number,
    date: Date,
    endDisbled?: boolean
  ) => {
    if (!endDisbled) endDisbled = false;
    setShowDailog({
      open: true,
      startIndex,
      starting,
      endDisbled,
      date,
    });
  };
  const closeDailog = () =>
    setShowDailog((state) => {
      return { ...state, open: false };
    });

  const setstartingFn = (data: Itodo) => {
    setstarting(data);
  };

  const hoursOfDay = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => {
        const hour = i % 12 === 0 ? 12 : i % 12;
        const ampm = i < 12 ? "AM" : "PM";
        return `${hour} ${ampm}`;
      }),
    []
  );
  const getSameDayEvent = (events: Record<string, Itodo>, currentDay: Date) => {
    return Object.values(events).filter((event) => {
      const eventDate = new Date(event.date).toDateString();
      return eventDate === new Date(currentDay).toDateString();
    });
  };

  const getEventOnTime=(time:string,eventDate:Itodo[])=>{
    console.log(time,hoursOfDay.indexOf(time),hoursOfDay.indexOf(eventDate[0]?.starting),hoursOfDay.indexOf(eventDate[0]?.ending));
    
    return eventDate.reverse().find(e=>hoursOfDay.indexOf(e.starting)<=hoursOfDay.indexOf(time)&&hoursOfDay.indexOf(e.ending)>=hoursOfDay.indexOf(time))
  }


  const filterAvailableTimes = (events: Itodo[],event?:Itodo) => {
    let newArr: string[] = [];
    for(const key of hoursOfDay){
      newArr.push(key);
      const lock=events.find((val) => val.starting == key)
      
    }


    return newArr;
  };
  return (
    <DayAndWeekContext.Provider
      value={{
        selectedTime,
        setSelectedTimeFn,
        colors,
        currentWeek,
        startOfCurrentWeek,
        handleNextWeek,
        handlePrevWeek,
        showDialog,
        goToWeekOfDate,
        dailogStateChange,
        closeDailog,
        starting,
        setstartingFn,
        hoursOfDay,
        filterAvailableTimes,
        getSameDayEvent,
        getEventOnTime
      }}
    >
      {children}
    </DayAndWeekContext.Provider>
  );
};

export default DayAndWeekContext;
