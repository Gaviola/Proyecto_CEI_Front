'use client';
import React from "react";
import MailPasswordInput from "../components/mailPasswordInput";
import SeparatorLine from "../components/separatorLine";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleSubmit = async (mail: string, password: string) => {
    try {
      const response = await fetch("http://192.168.194.158:8080/login/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: mail,
          password: password,
        }),
      });

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

  const handleGoogleSignIn = () => {
    signIn("google");
  }

  const router = useRouter();

  const handleRegister = () => {
    // Push to registration page
    router.push("/sign-up");
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
          onClick={handleGoogleSignIn}
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