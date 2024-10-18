import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import todoSchema, { TtodoSchema } from "@/lib/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import LabelWithInput from "../ux/labelWithInput";
import { Loader2 } from "lucide-react";
import { Addtodo } from "@/store/todo/todoSlice";

const AddTodoDialog = () => {
  const { colors, showDialog, closeDailog } = useContext<
    DayAndWeekContextType | undefined
  >(DayAndWeekContext) as DayAndWeekContextType;
  const [color, setcolor] = useState(colors[0])
  const dispatch = useDispatch<AppDispatch>();
  const {handleSubmit,register,reset,setValue,formState: { errors, isSubmitting }} = useForm<TtodoSchema>({resolver: zodResolver(todoSchema),defaultValues: {starting: showDialog.starting,ending:showDialog.starting}});
  useEffect(() => {
    reset({
      starting: showDialog.starting, 
      ending:showDialog.starting
    });
  }, [showDialog.starting, reset]);
  const formSubmit: SubmitHandler<TtodoSchema> = async ({name,starting,ending}) => {
    try {
      dispatch(Addtodo({name,starting:starting,ending:ending??starting,date:showDialog.date.toString(),id:showDialog.date+starting,color}))
      toast.success(" successfully added");
      closeDailog()
      reset();
    } catch (error) {}
  };

  const errorFn: SubmitErrorHandler<TtodoSchema> = (err) => {
    Object.values(err).forEach((e) => {
      toast.error(e.message);
    });
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
  const ref=useRef<HTMLButtonElement>()
  const close=useRef<HTMLButtonElement>()
  useEffect(()=>{
    if(ref.current&&showDialog.open){
      ref.current.click();
    }else if(close.current){
      close.current.click();
    }
  },[showDialog.open])

  return (
    <Dialog
    open={showDialog.open}
    onOpenChange={open=>!open&&closeDailog()}
    >
      <DialogOverlay className="hidden"></DialogOverlay>
      {/* <DialogTrigger  ref={ref as React.LegacyRef<HTMLButtonElement>} >open</DialogTrigger> */}
      <DialogContent className="rounded-md bg-background/70 ">
      <form  onSubmit={handleSubmit(formSubmit,errorFn)}>
        <DialogHeader>
          <DialogTitle>Add section </DialogTitle>
          <DialogDescription>Organize your Todos As Section</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
      
          <LabelWithInput
            i={1}
            label="name"
            name="name"
            register={register}
            type="text"
            error={errors.name}
            placeholder="name of the todo"
            isSubmitting={isSubmitting}
          />
          <div className=" flex  items-center gap-2">
            <LabelWithInput
              className="w-full"
              i={2}
              label="starting"
              name="starting"
              register={register}
              type="text"
              error={errors.starting}
              disabled={true}
              isSubmitting={isSubmitting}
            />
            <div className="grid gap-4 w-full">
              <Label htmlFor="end" className="flex translate-y-2 items-center gap-1">
                ending
                <span className="text-red-700">*</span>
              </Label>
              <Select 
                onValueChange={(val)=>{
                   setValue("ending",val)
                }}  
                
                disabled={showDialog.endDisbled || isSubmitting}
              >
                <SelectTrigger className="flex h-10 w-full rounded-md outline-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-1 outline-none outline-primary disabled:cursor-not-allowed disabled:opacity-50 undefined ">
                  <SelectValue placeholder={showDialog.starting} />
                </SelectTrigger>
                <SelectContent className="max-h-[15rem]">
                  {[...hoursOfDay]
                    .splice(showDialog.startIndex, hoursOfDay.length - 1)
                    .map((hour, index) => (
                      <SelectItem key={index} value={hour}>
                        {hour}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-1 md:justify-start justify-center w-full p-3">
            {colors.map((e) => (
              <div
              onClick={()=>setcolor(e)}
                key={e}
                style={{ backgroundColor: e }}
                className={`rounded-full ${color==e&&"  border-white border-2 after:opacity-100"} after:opacity-0 after:transition-all after:ease-in after:duration-[.3] after:w-[.3rem] after:rounded-full after:h-[.3rem] after:bg-white relative after:absolute after:top-0 after:left-3/4    cursor-pointer bg-[${e}] w-[2rem] h-[2rem]`}
              ></div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <DialogClose ref={close as React.LegacyRef<HTMLButtonElement>}></DialogClose>
          {/* <DialogClose> */}
            <Button className="active:scale-90 transition-all ease-in duration-[.3]">
            {isSubmitting && <Loader2  className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          {/* </DialogClose> */}
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoDialog;
