import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Input } from "../ui/input";
import { FieldError, useForm } from "react-hook-form";

interface prop {
  i: number;
  type: string;
  name: string;
  label: string;
  error?: string | undefined | FieldError;
  placeholder?: string;
  register: ReturnType<typeof useForm<any>>["register"];
  disabled?:boolean
  className?:string,
  isSubmitting?:boolean
}

const LabelWithInput = ({
  i,
  type,
  name,
  label,
  placeholder,
  error,
  register,
  disabled,
  className,
  isSubmitting
}: prop) => {
  const [show, setShow] = useState<boolean>(false);
  const [Type, setType] = useState<string>(type);
  if(!disabled) disabled=false

  return (
    <div  className={`grid gap-2  ${className}`}>
      <Label htmlFor={`input${i}`}>
        {label} <span className="text-red-700">*</span>
      </Label>

      <div className="flex items-center justify-end">
        {" "}
        <Input
        disabled={disabled || isSubmitting}
          {...register(`${name}`)}
          id={`input${i}`}
          type={Type}
          placeholder={placeholder}
          className={`${error&&"errInput"}`}
        />
        {type == "password" && (
          <i
            onClick={() => {
              setShow(!show);
              Type == "password" ? setType("text") : setType("password");
            }}
            className={`cursor-pointer ${
              show ? "ri-eye-close-line" : "ri-eye-2-line"
            } absolute me-2`}
          ></i>
        )}
      </div>
    </div>
  );
};

export default LabelWithInput;
