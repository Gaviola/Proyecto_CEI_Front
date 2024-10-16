"use client";
import UsersTable from "../components/usersTable";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Input } from "postcss";
import InputSearcher from "../components/inputSearcher";
import { Selection } from "@react-types/shared";
import UserModal from "../components/userModal";
import { DateValue } from "@internationalized/date";

export interface User {
  id: number;
  name: string;
  lastName: string;
  idNumber: string;
  registrationDate: DateValue | undefined;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    async function fetchUsers(searchContent: string) {
      debounce(() => setLoading(true), 100);
      const res = await fetch(
        "http://localhost:3000/api/users?content=" + searchContent
      );
      const data = await res.json();
      setUsers(data.users);
      setLoading(false);
    }

    fetchUsers(searchContent);
  }, [searchContent]);

  const handleSelectedKey = (key: Selection) => {
      // Aquí asumimos que key es un Set<Key>
      const selectedKey = Array.from(key)[0]; // Obtiene la primera clave del conjunto (si hay alguna)
      const selectedLoan = users.find((user) => user.idNumber.toString() === selectedKey) || null;
  
      setSelectedUser(selectedLoan); // Actualiza el estado del préstamo seleccionado
  };

  return (
    <main className="py-5 px-7 w-full">
      <h1 className="text-2xl font-bold text-gray-900 m-2">Usuarios</h1>


      {/* TODO: Fetch users from API */}
      {/* TODO: Search bar */}
      {/* TODO: Pagination */}
      {/* TODO: Modal to create new user */}
      {/* TODO: Modal to see user details */}
      {/* TODO: Add filter of user type */}

      {/* Imput for search */}
      <InputSearcher
        onChange={debounce(setSearchContent, 300)}
        onEnter={setSearchContent}
        placeholder="Buscar usuario"
      />

      <UserModal user={selectedUser} users={users} setUsers={setUsers} />

      <UsersTable
        users={users}
        isLoading={loading}
        onSelectionChange={handleSelectedKey}
      />
    </main>
  );
}
