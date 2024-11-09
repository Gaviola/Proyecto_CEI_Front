"use client";
import React from "react";
import Image from "next/image";
import DropdownOptions from "./dropdownOptions";
import Navbar from "./navbar";

export default function Header({ showDropdown }: { showDropdown: boolean }) {
  return (
    <header className="flex w-screen h-24 items-center justify-between p-4  bg-[#84BC3C] shadow-md">
      <Image
        src="/Sinergia logo 1.svg"
        alt="Sinergia logo"
        width={100}
        height={60}
        className=""
      />

      {showDropdown && <DropdownOptions />}
    </header>
  );
}
