'use client';
import React from "react";
import MailPasswordInput from "../../components/mailPasswordInput";
import SeparatorLine from "../../components/separatorLine";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signIn, getSession } from "next-auth/react";
import { logInMailAndPassword } from "@/services/auth"

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (mail: string, password: string) => {
    try {
      const response = await logInMailAndPassword(mail, password);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("sessionToken", data.tokenJWT)

        // Redirect
        if (data.role === "admin") router.push("/admin/loans")
        else if (data.role === "student") router.push("/user/loans") // TODO
        else toast.error("Error al ingresar")

      } else if (response.status === 401) {
        toast.error("Mail o contraseña incorrecto");
      } else {
        toast.error("Error al ingresar");
      }
    } catch (error) {
      toast.error("Error al ingresar");
    }
  };



  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent page reload (default behavior of button click)
    e.preventDefault();
    const result = await signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google-login` });
    if (result?.error) {
      toast.error("Error al iniciar sesión con Google");
      return;
    }
  };


  const handleRegister = () => {
    // Push to registration page
    router.push("/auth/sign-up");
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="h-auto <p-4 rounded text-center" style={{ width: '500px' }}>
        <ToastContainer />

        {/* Mail & Password Login */}
        <h1 className="font-bold text-xl">Iniciá sesión</h1>
        <p>Ingresá tu correo y contraseña para ingresar</p>
        <MailPasswordInput
          onSubmit={handleSubmit}
          buttonLabel="Iniciar sesión"
        />

        <SeparatorLine />

        {/* Google  */}
        <button
          className="border-1 border-gray-300 rounded-lg px-4 py-1 bg-black text-white w-full my-3"
          onClick={(e) => handleGoogleSignIn(e)}
        >
          Iniciar con Google
        </button>

        <SeparatorLine />

        {/* Registration */}
        <p className="mt-3">¿No tenés cuenta?</p>
        <button
          className="border-1 border-gray-300 rounded-lg px-4 py-1 bg-black text-white w-full"
          onClick={handleRegister}
        >
          Registrate
        </button>

      </div>
    </div >
  );
}