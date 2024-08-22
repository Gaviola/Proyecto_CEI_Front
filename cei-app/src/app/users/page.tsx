"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  dni: string;
  registrationDate: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://localhost:3000/api/usuarios");
      const data = await res.json();
      setUsers(data.users);
      setLoading(false);
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="m-10">
      <h1 className="text-4xl font-bold">Administración de Usuarios</h1>
      <div className="flex flex-row text-gray-600 mt-4">
        <h2 className="text-xl font-bold w-28">Nombre</h2>
        <h2 className="text-xl font-bold">Apellido</h2>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <div className="flex flex-row">
              <div className="w-28">{user.firstName}</div>
              <div>{user.lastName}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
