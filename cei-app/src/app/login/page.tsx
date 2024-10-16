'use client';
import React from "react";
import MailPasswordInput from "../components/mailPasswordInput";
import SeparatorLine from "../components/separatorLine";
import signIn from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const handleSubmit = (mail: string, password: string) => {
    alert(mail + password);
  }; // TODO

  const handleGoogleSignIn = () => {
    alert("Google sign in");
    // signIn(
    //   {
    //     providers: [
    //       GoogleProvider({
    //         clientId: "207471985952-upkliik44r6pbpqkphc1l2shork5qkvl.apps.googleusercontent.com",
    //         clientSecret: ""
    //       })
    //     ]
    //   }
    // );
  }

  const router = useRouter();

  const handleRegister = () => {
    // Push to registration page
    router.push("/sign-up");
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="h-auto <p-4 rounded text-center" style={{ width: '500px' }}>
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