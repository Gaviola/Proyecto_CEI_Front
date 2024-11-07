'use client';
import React from "react";
import Input from "../components/input";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function RegistrationPage() {
    const [formData, setFormData] = React.useState({
        name: "",
        surname: "",
        dni: "",
        phone: "",
        school: ""
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/register/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    surname: formData.surname,
                    dni: formData.dni,
                    phone: formData.phone,
                    school: formData.school
                }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success("Registro exitoso")
            } else {
                toast.error("Ocurrió un error");
            }
        } catch (error) {
            toast.error("Ocurrió un error");
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <ToastContainer />
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
                    <Input
                        type="text"
                        name="phone"
                        placeholder="Número de teléfono"
                        required={true}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <Input
                        type="text"
                        name="school"
                        placeholder="Facultad"
                        required={true}
                        onChange={(e) => setFormData({ ...formData, school: e.target.value })}
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