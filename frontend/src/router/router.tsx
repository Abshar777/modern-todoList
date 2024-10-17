import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "@/pages/auth/login.tsx";
import SignUp from "@/pages/auth/SignUp.tsx";
import Auth from "@/pages/auth/Auth.tsx";
import HomeLayout from "@/pages/home/homeLayout";
import Dashborad from "@/pages/home/dashborad";
import Test from "@/pages/test";

const router = createBrowserRouter([

  {
    path: "/",
    element: <Navigate replace={true} to={"/auth/login"} />,
  
  },

  {
    element: <Auth />,
    children: [
      {
        path: "/auth",
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "sign-up",
            element: <SignUp />,
          },
        ],
      },
    ],
  },{
    element:<HomeLayout/>,
    children:[{
      path:"/home",
      element:<Dashborad/>
    },
    {path:"/test",
    element:<Test/>}
  ]
    
  },

]);


export default router;
