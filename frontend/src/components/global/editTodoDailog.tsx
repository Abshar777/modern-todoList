import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useContext, useEffect, useMemo, useState } from "react";
import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import todoSchema, { TtodoSchema } from "@/lib/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import LabelWithInput from "../ux/labelWithInput";
import { Loader2 } from "lucide-react";
import {  EditTodo } from "@/store/todo/todoSlice";
import TodoContext, { ItodoConetxt } from "@/context/todoContext";

const EditTodoDailog = () => {
  const { colors,hoursOfDay } = useContext<
    DayAndWeekContextType | undefined
  >(DayAndWeekContext) as DayAndWeekContextType;
  const {editTodo,closeEditTodoFn}=useContext(TodoContext) as ItodoConetxt
  const [color, setcolor] = useState(editTodo.data.color);
  const [compare, setcompare] = useState(editTodo.data.starting)
  const dispatch = useDispatch<AppDispatch>();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TtodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      starting: editTodo.data.starting,
      ending: editTodo.data.ending,
      name:editTodo.data.name
    },
  });
  useEffect(() => {
    reset({
      starting: editTodo.data.starting,
      ending: editTodo.data.ending,
      name:editTodo.data.name
    });
    setcompare(editTodo.data.starting);
    setcolor(editTodo.data.color)
  }, [editTodo.data.starting, editTodo.data.name,editTodo.data.ending,editTodo.data.color, reset]);
  const formSubmit: SubmitHandler<TtodoSchema> = async ({
    name,
    starting,
    ending,
  }) => {
    try {
      dispatch(
      EditTodo({
        Pid:editTodo.data.id,
        name,
        starting,
        ending: ending ?? starting,
        date: editTodo.data.date.toString(),
        id: editTodo.data.date + starting,
        color,
      })
      );
      toast.success(" successfully updated");
      closeEditTodoFn();
      reset();
    } catch (error) {}
  };

  const errorFn: SubmitErrorHandler<TtodoSchema> = (err) => {
    Object.values(err).forEach((e) => {
      toast.error(e.message);
    });
  };
 
  return (
    <Dialog
      modal
      onOpenChange={open => !open && closeEditTodoFn() }
      open={editTodo.open}
    >
      <DialogContent className="rounded-md bg-background/70 ">
        <form onSubmit={handleSubmit(formSubmit, errorFn)}>
          <DialogHeader>
            <DialogTitle>edit todo </DialogTitle>
            <DialogDescription>
              edit todo {}
            </DialogDescription>
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
            <div className="grid gap-4 w-full">
                <Label
                  htmlFor="end"
                  className="flex translate-y-2 items-center gap-1"
                >
                  starting
                  <span className="text-red-700">*</span>
                </Label>
                <Select
                  onValueChange={(val) => {
                    setValue("starting", val);
                    setValue("ending",val)
                    setcompare(val)
                  }}
                >
                  <SelectTrigger className="flex h-10 w-full rounded-md outline-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-1 outline-none outline-primary disabled:cursor-not-allowed disabled:opacity-50 undefined ">
                    <SelectValue  placeholder={editTodo.data.starting} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[15rem]">
                    {[...hoursOfDay]
                      .splice(0, hoursOfDay.length - 1)
                      .map((hour, index) => (
                        <SelectItem key={index} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-4 w-full">
                <Label
                  htmlFor="end"
                  className="flex translate-y-2 items-center gap-1"
                >
                  ending
                  <span className="text-redw-700">*</span>
                </Label>
                <Select
                  onValueChange={(val) => {
                    setValue("ending", val);
                  }}
                >
                  <SelectTrigger className="flex h-10 w-full rounded-md outline-0 border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-1 outline-none outline-primary disabled:cursor-not-allowed disabled:opacity-50 undefined ">
                    <SelectValue  placeholder={[...hoursOfDay]
                      .splice(hoursOfDay.indexOf(compare), hoursOfDay.length - 1)[0]} />
                  </SelectTrigger>
                  <SelectContent className="max-h-[15rem]">
                    {[...hoursOfDay]
                      .splice(hoursOfDay.indexOf(compare), hoursOfDay.length - 1)
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
                  onClick={() => setcolor(e)}
                  key={e}
                  style={{ backgroundColor: e }}
                  className={`rounded-full ${
                    color == e && "  border-white border-2 after:opacity-100"
                  } after:opacity-0 after:transition-all after:ease-in after:duration-[.3] after:w-[.3rem] after:rounded-full after:h-[.3rem] after:bg-white relative after:absolute after:top-0 after:left-3/4    cursor-pointer bg-[${e}] w-[2rem] h-[2rem]`}
                ></div>
              ))}
            </div>
          </div>
          <DialogFooter>
            {/* <DialogClose> */}
            <Button className="active:scale-90 transition-all ease-in duration-[.3]">
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save changes
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDailog;
