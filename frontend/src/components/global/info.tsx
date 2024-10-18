import { Drawer } from "vaul";
import { useContext } from "react";
import TodoContext, { ItodoConetxt } from "@/context/todoContext";

const Info = () => {
  const { showInfo, closeInfoFn } = useContext<ItodoConetxt | undefined>(
    TodoContext
  ) as ItodoConetxt;
  return (
    <Drawer.Root
      open={showInfo.open}
      onOpenChange={(open) => {
        !open && closeInfoFn();
      }}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/90 z-[999]" />
        <Drawer.Content className="right-0 top-0 bottom-0 fixed z-[9999999] flex outline-none">
          <div
            style={{ backgroundColor: showInfo.data.color }}
            className="bg-background relative rounded-[16px] w-[310px] grow mt-2 mr-2 mb-2 py-5 flex flex-col items-start "
          >
            <div className="max-w-md   px-5">
              <Drawer.Title className="font-medium mb-2 text-foreground text-xl">
                {showInfo.data.name}
              </Drawer.Title>
              <Drawer.Description className=" mb-2 w-full text-foreground/80  text-start ">
                Date:{" "}
                {showInfo.data.date
                  ?.toString()
                  .split(" ")
                  .splice(0, 4)
                  .join(" ")}
              </Drawer.Description>
              <Drawer.Description className=" mb-5 w-full text-foreground/80  text-start ">
                Time: {showInfo.data.starting} to {showInfo.data.ending}
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default Info;
