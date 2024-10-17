import ConformModal from "@/components/global/conformModal";
import Sidebar from "@/components/global/sidebar";
import SideMenu from "@/components/global/sideMenu";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import Transition from "@/components/ux/transition";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <div className="dashBoard w-full h-screen overflow-hidden flex">
      <TooltipProvider>
        <DropdownMenu>
          <Sidebar />
          <SideMenu />
          <Outlet />
        </DropdownMenu>
      </TooltipProvider>
          <ConformModal/>
    </div>
  );
};

export default HomeLayout
