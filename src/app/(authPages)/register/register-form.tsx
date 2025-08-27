
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IRegister } from '@/@types/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginCustomerMutation } from "@/redux/api/user/user";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { setAuth } from "@/redux/features/auth/authSlice";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegister>(); // Use IRegister instead of ILogin

  const [loginCustomer, { isLoading, error }] = useLoginCustomerMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IRegister> = async (data) => {
    const { email, password } = data;

    try {
      // Clear any previous errors
      setLoginError(null);

      // Call the login mutation
      const result = await loginCustomer({ email, password }).unwrap();
      console.log("Login Response:", result);

      // Dispatch the credentials to Redux store using your auth slice
      dispatch(setAuth({
        token: result.accessToken,
        id: result.data.id.toString(),
        email: result.data.email,
        expiresAt: null
      }));

      toast.success(result.message);
      router.push("/");

    } catch (err: any) {
      console.error("Login error:", err);

      // Handle different error formats
      if (err.data?.message) {
        toast.error(err.data.message);
        setLoginError(err.data.message);
      } else if (err.status === "FETCH_ERROR") {
        const errorMsg = "Network error. Please check your connection.";
        toast.error(errorMsg);
        setLoginError(errorMsg);
      } else {
        const errorMsg = "Login failed. Please check your credentials and try again.";
        toast.error(errorMsg);
        setLoginError(errorMsg);
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#F5F5F5]">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {loginError}
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {'data' in error ?
                  (error.data as { message?: string }).message || 'Login failed' :
                  'Login failed'}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

              {/* Email Field */}
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
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="font-semibold text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Password Field */}
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
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                >
                  Register
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
