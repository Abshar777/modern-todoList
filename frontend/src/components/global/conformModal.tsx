import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import TodoContext, { ItodoConetxt } from "@/context/todoContext";
import { useContext } from "react";
import { Button } from "../ui/button";

const ConformModal = () => {
  const { showModal, closeModalFn } = useContext(TodoContext) as ItodoConetxt;
  return (
    <Dialog
      modal
      open={showModal.open}
        onOpenChange={(open) => !open && closeModalFn()}
    >
      <DialogContent className="rounded-md bg-background/70 ">
     
        <DialogHeader>
          <DialogTitle>Are you absolutely sure? </DialogTitle>
          <DialogDescription>  This action cannot be undone. This will permanently delete your      account and remove your data from our servers.</DialogDescription>
        </DialogHeader>
   
        <DialogFooter>
        <DialogClose><Button variant={"secondary"}>Cancel</Button></DialogClose>
        <DialogClose onClick={() => showModal.callBack(showModal.data)}><Button variant={"default"}>Conform</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  );
};

export default ConformModal;
