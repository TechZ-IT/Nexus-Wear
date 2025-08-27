"use client"
import { useForm, SubmitHandler } from "react-hook-form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {ILogin} from '@/@types/auth'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>()
  
  const onSubmit: SubmitHandler<ILogin> = (data) => {
    const {email, password} = data;
    console.log(email, password)
  }
  
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
                <Button type="submit" className="w-full">
                  Login
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
  )
}