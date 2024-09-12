"use client";
import UsersTable from "../components/usersTable";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  lastName: string;
  idNumber: string;
  registrationDate: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("http://localhost:3000/api/users");
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
    <main  className="py-5 px-7 w-full">
      <h1 className="text-2xl font-bold text-gray-900 m-2">
        Usuarios
      </h1>

      {/* TODO: Fetch users from API */}
      {/* TODO: Search bar */}
      {/* TODO: Pagination */}
      {/* TODO: Modal to create new user */}
      {/* TODO: Modal to see user details */}
      {/* TODO: Add filter of user type */}


      <UsersTable  
        users={users}
      />  
    </main>
  );
}
