"use client";
import "../globals.css";
import Navbar from "../components/navbar";
import { useUser } from '../context/userContext';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtLogin } from "@/services/auth";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, setUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const handleError = () => {
      // Delete user context
      setUser(null);
      // Remove session token
      localStorage.removeItem('sessionToken');
      // Redirect to login if unauthenticated
      router.push('/auth/login');
    }

    const fetchUserData = async () => {
      try {
        const response = await jwtLogin(localStorage.getItem('sessionToken'));
        if (response.ok) {
          const data = await response.json();

          if (data.role !== "admin") {
            handleError();
          }

          setUser({
            name: data.username,
            email: data.email,
            role: data.role,
          });

        } else {
          // Redirect to login if unauthenticated
          handleError();
        }
      } catch (error) {
        handleError();
      }
    };

    if (!user) {
      fetchUserData();
    }

  }, [setUser, router, user]);

  return (
    <div className="flex flex-row w-screen">
      <div className=" sm:block hidden">{<Navbar />}</div>
      {children}
    </div>
  );
}
