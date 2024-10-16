'use client';
import React from "react";
import Input from "../components/input";
export default function RegistrationPage() {
    const [formData, setFormData] = React.useState({
        name: "",
        surname: "",
        dni: "",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert("Name: " + formData.name + "\nSurname: " + formData.surname + "\nDNI: " + formData.dni);
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <div className="h-auto <p-4 rounded text-center" style={{ width: '500px' }}>
                <h1 className="font-bold text-xl">Completá tus datos</h1>
                <form
                    className="flex flex-col gap-4 my-3"
                    onSubmit={handleSubmit}
                    onKeyDown={(e) => { e.key === "Enter" && handleSubmit; }}
                >
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        required={true}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        type="text"
                        name="surname"
                        placeholder="Apellido"
                        required={true}
                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    />
                    <Input
                        type="text"
                        name="dni"
                        placeholder="DNI"
                        required={true}
                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    />
                    <button
                        className="border-1 border-gray-300 rounded-lg px-4 py-1 bg-black text-white"
                        type="submit"
                    >
                        Guardar
                    </button>
                </form>
            </div>
        </div >
    )
}