"use client";
import UsersTable from "../../components/usersTable";
import { useEffect, useState, useRef } from "react";
import { debounce, set } from "lodash";
import { Input } from "postcss";
import InputSearcher from "../../components/inputSearcher";
import { Selection } from "@react-types/shared";
import UserModal from "../../components/userModal";
import { DateValue } from "@internationalized/date";
import { fetchUsers } from "@/services/users";

export interface User {
  id: number;
  name: string;
  lastname: string;
  dni: number;
  student_id: number;
  email: string;
  phone: number;
  is_verified: boolean;
  creator_id: number;
  role: string;
  school: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchContent, setSearchContent] = useState("");
  const hasMounted = useRef(false);

  const searchUsers = (searchContent: string) => {
    setLoading(true);
    debounce(() => {
      const filtered = users.filter(
        (user) =>
          (user.name &&
            user.name.toLowerCase().includes(searchContent.toLowerCase())) ||
          (user.lastname &&
            user.lastname
              .toLowerCase()
              .includes(searchContent.toLowerCase())) ||
          (user.email &&
            user.email.toLowerCase().includes(searchContent.toLowerCase()))
      );
      setFilteredUsers(filtered);
      setLoading(false);
    }, 100)();
  };

  useEffect(() => {
    if (hasMounted.current) {
      searchUsers(searchContent);
    } else {
      hasMounted.current = true;
    }
  }, [searchContent]);

  async function getUsers() {
    setLoading(true);
    const res = await fetchUsers();
    setUsers(res);
    setFilteredUsers(res);
    setLoading(false);
  }

  useEffect(() => {
    getUsers();
  }, []);

  const handleSelectedKey = (key: Selection) => {
    // Aquí asumimos que key es un Set<Key>
    const selectedKey = Array.from(key)[0]; // Obtiene la primera clave del conjunto (si hay alguna)
    const selectedUser = users.find((user) => user.id == selectedKey) || null;
    setSelectedUser(selectedUser);
  };

  return (
    <main className="sm:m-10 m-5 w-full">
      <h1 className="text-4xl font-bold py-4">Usuarios</h1>

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

      <UserModal user={selectedUser} users={users} setUsers={setUsers} fetchUsers={getUsers} />

      <UsersTable
        users={filteredUsers}
        isLoading={loading}
        onSelectionChange={handleSelectedKey}
      />
    </main>
  );
}
