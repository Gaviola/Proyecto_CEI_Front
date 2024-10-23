'use client';
import React from "react";
import MailPasswordInput from "../components/mailPasswordInput";
export default function SignupPage() {
  const handleSubmit = (mail: string, password: string) => {
    alert(mail + password);
  }; // TODO


  return (
    <div className="flex justify-center items-center w-full min-h-screen">
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