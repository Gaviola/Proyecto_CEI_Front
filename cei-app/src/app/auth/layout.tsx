import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../components/header";
import Navbar from "../components/navbar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} max-h-screen overflow-hidden`}>
        {<Header showDropdown={false} />}
        <div className="flex flex-row w-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
