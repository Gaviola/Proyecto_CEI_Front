"use client";
import React from "react";
import Image from "next/image";
import DropdownOptions from "./dropdownOptions";
import { useUser } from "../context/userContext";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="flex w-screen h-24 items-center justify-between p-4  bg-[#84BC3C] shadow-md">
      <Image
        src="/Sinergia logo 1.svg"
        alt="Sinergia logo"
        width={100}
        height={60}
        className=""
      />

      {user && <DropdownOptions user={user} />}
    </header>
  );
}
