import { useDispatch } from "react-redux";
import { LogoutUser, SetUser } from "../store/auth/authSlice";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";


//  home and other protected route
export const useAuth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/check");
        dispath(SetUser(data.user));
      } catch (error) {
        navigate("/auth/login");
        dispath(LogoutUser());
      }
    })();
  });
};


// only route for login and sign-up
export const useAuthCheck=()=>{
  const navigate = useNavigate();
  const dispath = useDispatch<AppDispatch>();
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/check");
        dispath(SetUser(data.user));
        navigate('/home')
      } catch (error) {
        dispath(LogoutUser());
      }
    })();
  });
}
