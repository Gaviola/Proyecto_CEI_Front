'use client';
import React from "react";
import MailPasswordInput from "../../components/mailPasswordInput";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { signUp } from "@/services/auth";
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
  const router = useRouter();

  const handleSubmit = async (mail: string, password: string) => {
    try {
      const response = await signUp(mail, password);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("sessionToken", data.tokenJWT)

        // Redirect 
        if (data.role === "student") router.push("/user/loans") // TODO
        else toast.error("Error al ingresar") // Only students can register by themselves

      } else {
        toast.error("Error al ingresar");
      }
    } catch (error) {
      toast.error("Error al ingresar");
    }
  };


  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <ToastContainer />
      <div className="h-auto p-4 rounded text-center" style={{ width: '500px' }}>
        {/* Mail & Password Login */}
        <h1 className="font-bold text-xl">Registrate</h1>
        <p>Ingresá tu correo y contraseña</p>
        <MailPasswordInput
          onSubmit={handleSubmit}
          buttonLabel="Registrarse"
        />
      </div>
    </div >
  );
}