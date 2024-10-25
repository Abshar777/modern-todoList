import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogClose,
} from "@/components/ui/dialog";

import DayAndWeekContext, { DayAndWeekContextType } from "@/context/dayAndWeek";
import { useContext, useState } from "react";

const Test = () => {
  const jj=(e:React.MouseEvent<HTMLDivElement, MouseEvent>)=>{

  }
    const [open, setopen] = useState(false)
  const { dailogStateChange } = useContext(
    DayAndWeekContext
  ) as DayAndWeekContextType;
  return (
    <ContextMenu>
      <ContextMenuTrigger>open</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onSelect={(e) => {
            e.preventDefault();
            setopen(true)
          }}
        >
          add
        </ContextMenuItem>
        <Dialog modal open={open} onOpenChange={open=>!open&&setopen(false)}>
          {" "}
          <DialogTrigger></DialogTrigger>
          <DialogContent className="rounded-md bg-background/70 ">
            <DialogHeader>
              <DialogTitle>Are you absolutely sure? </DialogTitle>
              <DialogDescription>
                {" "}
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
        <div className="" onClick={jj}></div>
            <DialogFooter>
              <DialogClose></DialogClose>
              <DialogClose>Conform</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Test;
