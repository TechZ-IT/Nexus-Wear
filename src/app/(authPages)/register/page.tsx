import { RegisterForm } from "./register-form";


export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-100px)] w-full items-center justify-center p-10 md:p-30">
      <div className="w-full max-w-md">
        <RegisterForm></RegisterForm>
      </div>
    </div>
  )
}
