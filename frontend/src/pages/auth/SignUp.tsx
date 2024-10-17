import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"; 
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm, SubmitErrorHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpSchemaType } from "../../lib/authschema";
import { toast } from "sonner";
import LabelWithInput from "@/components/ux/labelWithInput";
import axios, { AxiosError } from "axios";
import { SetUser } from "@/store/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import {useGoogleAuthHandler} from "@/util/googleAuthHandler";


export default function SignUp() {
  const googleHandler=useGoogleAuthHandler();
  const dispatch = useDispatch();
  const navigete = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.Auth);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<signUpSchemaType>({
    resolver: zodResolver(signUpSchema),
  });
  const formSubmit: SubmitHandler<signUpSchemaType> = async (data) => {
    try {
      const { data: payload } = await axios.post("/api/users/register", {
        email: data.email,
        password:data.password ,
        name: data.firstName + " " + data.lastName,
      });
      toast.success("Account created successfully");
      dispatch(SetUser(payload))
      reset();
    } catch (error) {
      interface data {
        message: string;
      }
      const { message } = (error as AxiosError).response?.data as data;
      toast.error("login failed", { description: message });
    }
  };


  const errorFn: SubmitErrorHandler<signUpSchemaType> = (err) => {
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
          <CardTitle className="text-2xl tracking-normal  bg-clip-text  text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 ">Sign-Up</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <LabelWithInput
              register={register}
              i={1}
              type="text"
              name="firstName"
              label="first name"
              error={errors.firstName}
              placeholder="Max"
            />
            <LabelWithInput
              register={register}
              i={2}
              type="text"
              name="lastName"
              label="last name"
              error={errors.lastName}
              placeholder="Robinson"
            />
          </div>
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
          <Button  disabled={isSubmitting} className="w-full " type="submit">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </Button>
          <Button
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={googleHandler}
            className=" transition-all ease-in duration-[.5]  w-full"
          >
            Sign up with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
