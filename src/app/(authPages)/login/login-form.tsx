
"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ILogin } from '@/@types/auth';
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>();
  
  const [loginCustomer, { isLoading, error }] = useLoginCustomerMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
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
            {/* Display login error if any */}
            {loginError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {loginError}
              </div>
            )}
            
            {/* Display API error if any */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
                {'data' in error ? 
                  (error.data as { message?: string }).message || 'Login failed' : 
                  'Login failed'}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
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
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
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
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
            <Button variant="outline" className="w-full mt-3">
              Login with Google
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

