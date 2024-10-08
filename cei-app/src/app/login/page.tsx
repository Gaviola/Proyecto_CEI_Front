import React from "react";
import MailPasswordInput from "../components/mailPasswordInput";
import SeparatorLine from "../components/separatorLine";
import signIn from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export default function LoginPage() {
  var handleSubmit = (mail: string, password: string) => {
    alert(mail + password);
  }; // TODO


 
  return (
   
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-1/3 h-auto p-4 rounded text-center">
        <h1 className="font-bold text-xl">Iniciá sesión</h1>
        <p>Ingresá tu correo y contraseña para ingresar</p>
        <MailPasswordInput onSubmit={handleSubmit} />

        <SeparatorLine />

        {/* Google */}
        <button
          className="border-1 border-gray-300 rounded-lg px-4 py-1 bg-white"
          onClick={() => signIn(
            {  
               providers: [
                  GoogleProvider({
                    clientId: "207471985952-upkliik44r6pbpqkphc1l2shork5qkvl.apps.googleusercontent.com",
                    clientSecret: ""
                  })
              ] 
            }
          )}
        >
          Iniciar con Google
        </button>
        
        <SeparatorLine />

        <p>¿No tenés cuenta?</p>
        <button
          className="border-1 border-gray-300 rounded-lg px-4 py-1 bg-black text-white"
          // onClick={() => Router.push("/register")}
        >
          Registrate
        </button>
      </div>
    </div>
  );
}