"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IRegister } from '@/@types/auth';
import { ApiError } from '@/@types/error';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { setAuth } from "@/redux/features/auth/authSlice";
import { useRegisterCustomerMutation } from "@/redux/api/user/user";
import Link from "next/link";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>();

  const [registerCustomer, { isLoading, error }] = useRegisterCustomerMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    const { name, email, password } = data;

    // Clear previous errors
    setRegisterError(null);

    try {
      const result = await registerCustomer({ name, email, password }).unwrap();
      console.log("Register Response:", result);
      dispatch(setAuth({
        token: result.accessToken,
        id: result.data.id.toString(),
        email: result.data.email,
        expiresAt: null
      }));

      toast.success(result.message);
      router.push("/");

    } catch (err: unknown) {
      // Handle different error formats with proper typing
      if (typeof err === 'object' && err !== null) {
        const error = err as ApiError;

        if (error.data?.message) {
          const errorMessage = error.data.message;
          toast.error(errorMessage);
          setRegisterError(errorMessage);
        } else if (error.status === "FETCH_ERROR") {
          const errorMsg = "Network error. Please check your connection.";
          toast.error(errorMsg);
          setRegisterError(errorMsg);
        } else if (error.message) {
          toast.error(error.message);
          setRegisterError(error.message);
        } else {
          const errorMsg = "Registration failed. Please try again.";
          toast.error(errorMsg);
          setRegisterError(errorMsg);
        }
      } else {
        const errorMsg = "Registration failed. Please try again.";
        toast.error(errorMsg);
        setRegisterError(errorMsg);
      }
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create your account
        </p>
      </div>

      {/* Show only one error at a time - prefer registerError first */}
      {registerError && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
          {registerError}
        </div>
      )}

      {/* Only show RTK error if there's no registerError */}
      {error && !registerError && (
        <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
          {'data' in error ?
            (error.data as { message?: string }).message || 'Registration failed' :
            'Registration failed'}
        </div>
      )}

      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters"
              },
              maxLength: {
                value: 100,
                message: "Name cannot exceed 100 characters"
              }
            })}
            type="text"
            placeholder="Full Name"
          />
          {errors.name && (
            <span className="font-semibold text-sm text-red-500">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            placeholder="m@example.com"
          />
          {errors.email && (
            <span className="font-semibold text-sm text-red-500">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              },
              maxLength: {
                value: 12,
                message: "Password cannot exceed 12 characters"
              }
            })}
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="font-semibold text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  );
}