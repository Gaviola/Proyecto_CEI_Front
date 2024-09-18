"use client";
import UsersTable from "../components/usersTable";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { Input } from "postcss";
import InputSearcher  from "../components/inputSearcher";

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
  const [searchContent, setSearchContent] = useState("");

  useEffect(() => {
    async function fetchUsers(searchContent: string) {
      debounce(() => setLoading(true), 100)
      const res = await fetch("http://localhost:3000/api/users?content=" + searchContent);
      const data = await res.json();
      setUsers(data.users);
      setLoading(false);
    }
  
    fetchUsers(searchContent);
  }, [searchContent]);  


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

      {/* Imput for search */}
      <InputSearcher 
        onChange={debounce(setSearchContent, 300)} 
        onEnter={setSearchContent} 
        placeholder="Buscar usuario" 
        />

      {
        loading ? (
          <div className="flex justify-center items-center">
            <div className="w-10 h-10">
              <div> Cargando</div>
            </div>
          </div>
        ) : (
          <UsersTable users={users} />
        )
      }
       
    </main>
  );
}
