'use client';
import React from "react";
import MailPasswordInput from "../components/mailPasswordInput";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function SignupPage() {
  const handleSubmit = async (mail: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8080/login/user", {
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
        // TODO
      } else {
        toast.error("Error al ingresar");
      }
    } catch (error) {
      toast.error("Error al ingresar");
    }
  }; // TODO


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