'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import { logInGoogle } from "@/services/auth";
import { useUser } from "@/app/context/userContext";
import 'react-toastify/dist/ReactToastify.css';


const LoadingPage = () => {
  const router = useRouter();
  const { setUser } = useUser();

  useEffect(() => {
    let isMounted = true;
    const handleError = () => {
      toast.error("Error al iniciar sesión con Google");
      // Wait 2 seconds before redirecting to login page
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    }
    const fetchData = async () => {
      let session = await getSession();
      if (session && isMounted) {
        try {
          const response = await logInGoogle(session.accessToken, session.user?.email);
          console.log(response);

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("sessionToken", data.tokenJWT);

            // Redirect based on user role
            if (data.role === "admin") { router.push("/admin/loans"); }
            else if (data.role === "student") { router.push("/user/loans"); }
            else { handleError(); }

            // Update user context
            setUser({
              name: data.username,
              email: data.email,
              role: data.role
            });
          } else {
            handleError();
          }
        } catch (error) {
          console.error("Error al iniciar sesión con Google", error);
          handleError();
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [router, setUser]);

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <ToastContainer />
      <div className="h-auto p-4 rounded text-center" style={{ width: '500px' }}>
        <h1 className="font-bold text-xl">Estamos iniciando sesión, por favor espere...</h1>
      </div>
    </div>
  );
};

export default LoadingPage;

