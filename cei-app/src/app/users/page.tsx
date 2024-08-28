import UsersTable from "../components/usersTable";

export default function UsersPage() {
  return (
    <main  style={{padding: "10px"}}>
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
        ]}
      /> 
    </main>
  );
}