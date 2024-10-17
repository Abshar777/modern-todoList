import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "../../lib/authschema";
import { toast } from "sonner";
import LabelWithInput from "@/components/ux/labelWithInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import axios, { AxiosError } from "axios";
import { SetUser } from "@/store/auth/authSlice";
import { useEffect } from "react";
import { useGoogleAuthHandler } from "@/util/googleAuthHandler";
import { Loader2 } from "lucide-react";

export default function Login() {
  const googleHandler = useGoogleAuthHandler();
  const dispatch = useDispatch<AppDispatch>();
  const navigete = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.Auth);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<loginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "demo@gmail.com",
      password: "123#Demo",
    },
  });
  const formSubmit: SubmitHandler<loginSchemaType> = async (data) => {
    try {
      const { data: payload } = await axios.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });
      dispatch(SetUser(payload));
      toast.success(" successfully logined");
      reset();
    } catch (error) {
      interface data {
        message: string;
      }
      const { message } = (error as AxiosError).response?.data as data;
      toast.error("login failed", { description: message });
    }
  };

  const errorFn: SubmitErrorHandler<loginSchemaType> = (err) => {
    Object.values(err).forEach((e) => {
      toast.error(e.message);
    });
  };
  useEffect(() => {
    if (userInfo) navigete("/home");
  }, [userInfo]);
  return (
    <Card className="w-full max-w-[25rem]">
      <form onSubmit={handleSubmit(formSubmit, errorFn)}>
        <CardHeader>
          <CardTitle className="text-2xl bg-clip-text  text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LabelWithInput
            i={1}
            type="email"
            label="email"
            name="email"
            register={register}
            placeholder="m@email.com"
            error={errors.email}
          />
          <LabelWithInput
            i={2}
            type="password"
            label="password"
            name="password"
            register={register}
            error={errors.password}
          />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" variant={"default"  } disabled={isSubmitting} className="w-full ">
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
          <Button
            onClick={googleHandler}
            type="button"
            variant="outline"
            disabled={isSubmitting}
            className=" transition-all ease-in duration-[.5]  w-full"
          >
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/sign-up" className="underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
