"use client";
import "../globals.css";
import { useUser } from "../context/userContext";


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUser } = useUser();
  setUser(null); // Delete user context

  return (
    <div className="flex flex-row w-screen">{children}</div>
  );
}
