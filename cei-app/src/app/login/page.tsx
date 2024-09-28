"use client";

import React from "react";
import MailPasswordInput from "../components/mailPasswordInput";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center w-full  ">
      <div className="w-1/3 h-auto p-4 rounded">
        <h1 className="font-bold text-xl text-center">
          Iniciá sesión
        </h1>
        <p className="text-center">
          Ingresá tu correo y contraseña para ingresar
        </p>
        <MailPasswordInput
          onSubmit={(mail, password) => {
            alert(mail + password);
          }}
        />
      </div>
    </div>
  );
}
