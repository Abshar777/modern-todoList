import { auth, provider } from "@/config/firebase";
import { SetUser } from "@/store/auth/authSlice";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export const useGoogleAuthHandler = () => {
    const dispatch = useDispatch();

    const googleAuthHandler = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            const { data } = await axios.post("/api/users/google", { token });
            dispatch(SetUser(data));
            toast.success("Login successfully complete");
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { message } = error.response?.data as { message: string };
                toast.error("Login failed", { description: message });
            } else {
                console.error(error);
                toast.error("An unexpected error occurred");
            }
        }
    };

    return googleAuthHandler;
};
