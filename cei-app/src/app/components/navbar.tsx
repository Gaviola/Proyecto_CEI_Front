import { useState } from "react";

export default function Navbar() {
    const optionStyle = "font-bold pt-4 pl-4 pr-4 pb-8 -mb-4 border-b-5  border-transparent hover:border-white group-focus:border-white group-focus:bg-black  ";

    const [selectedOption, setSelectedOption] = useState("Usuarios");

    const handleOptionClick = (option:string) => {
        setSelectedOption(option);
    }


    return (
        <nav className="relative max-h-[100px]">
            <ul className="flex justify-center lg:space-x-40 space-x-20 text-white ">
                <li className={`${optionStyle} ${selectedOption === 'Usuarios' ? 'border-white' : ''}`} onClick={() => handleOptionClick('Usuarios')}>
                    <a href="/users">Usuarios</a>
                    
                </li>
                <li className={`${optionStyle} ${selectedOption === 'Inventario' ? 'border-white' : ''}`} onClick={() => handleOptionClick('Inventario')}>
                    <a href="#">Inventario</a>
                </li>
                <li className={`${optionStyle} ${selectedOption === 'Prestamos' ? 'border-white' : ''}`} onClick={() => handleOptionClick('Prestamos')}>
                    <a href="#">Préstamos</a>
                </li>
            </ul>
        </nav>
    )
}