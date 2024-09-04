import UsersTable from "../components/usersTable";

export default function UsersPage() {
  return (
    <main  style={{padding: "10px"}}>
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
        users={[
          {
            name: "Gabriel",
            lastname: "Garcia",
            email: "gabriel.garcia@gmail.com",
            idNumber: "12345678"
          },
          {
            name: "Pepe",
            lastname: "Garcia",
            email: "pepito.garcia@gmail.com",
            idNumber: "1234568"
          },
          {
            name: "Pepe",
            lastname: "Garcia",
            email: "pepito.garcia@gmail.com",
            idNumber: "1234568"
          },
          {
            name: "Pepe",
            lastname: "Garcia",
            email: "pepito.garcia@gmail.com",
            idNumber: "1234568"
          },
          {
            name: "Pepe",
            lastname: "Garcia",
            email: "pepito.garcia@gmail.com",
            idNumber: "1234568"
          },
        ]}
      /> 
    </main>
  );
}