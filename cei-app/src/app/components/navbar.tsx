"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { LuUsers } from "react-icons/lu";
import { MdOutlineInventory, MdOutlineShoppingCart } from "react-icons/md";

export default function Navbar() {
  const optionStyle =
    "relative p-6 transform hover:translate-x-4 hover:bg-background-200 active:bg-background-100  duration-500 group-focus:text-red text-black flex flex-row justify-center items-center gap-4 rounded-lg ";

  const [selectedOption, setSelectedOption] = useState("Usuarios");

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const buttonStyle = "w-6 h-[4px] bg-black rounded-md";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`${
        isOpen ? "" : "w-min"
      } relative h-screen bg-white bg-opacity-50 shadow-xl `}
    >
      <ul className="flex flex-col justify-center items-start duration-500">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="m-4 p-4 self-start space-y-1 rounded-lg hover:shadow-2xl hover:bg-background-100 active:bg-background-200 duration-200 "
        >
          <div className={buttonStyle}></div>
          <div className={buttonStyle}></div>
          <div className={buttonStyle}></div>
        </button>
        <li
          className={`${optionStyle} ${
            selectedOption === "Usuarios" ? "text-primaryGreen-500" : ""
          }`}
          onClick={() => handleOptionClick("Usuarios")}
        >
          <a href="/admin/users" className="">
            <LuUsers className="size-8" />
          </a>

          <a
            href="/admin/users"
            className={
              isOpen
                ? "block transform translate-x-0 duration-500"
                : "transform -translate-x-96 duration-500 w-0 hidden"
            }
          >
            <div className="">Usuarios</div>
          </a>
        </li>
        <li
          className={`${optionStyle} ${
            selectedOption === "Inventario" ? "text-primaryGreen-500" : ""
          }`}
          onClick={() => handleOptionClick("Inventario")}
        >
          <a href="#">
            <MdOutlineInventory className="size-8" />
          </a>

          <a
            href="#"
            className={
              isOpen
                ? "block transform translate-x-0 duration-500"
                : "transform -translate-x-96 duration-500 w-0 hidden"
            }
          >
            Inventario
          </a>
        </li>
        <li
          className={`${optionStyle} ${
            selectedOption === "Prestamos" ? "text-primaryGreen-500" : ""
          }`}
          onClick={() => handleOptionClick("Prestamos")}
        >
          <a href="/admin/loans">
            <MdOutlineShoppingCart className="size-8" />
          </a>
          <a
            href="/admin/loans"
            className={
              isOpen
                ? "block transform translate-x-0 duration-500"
                : "transform -translate-x-96 duration-500 w-0 hidden"
            }
          >
            Préstamos
          </a>
        </li>
      </ul>
    </nav>
  );
}
