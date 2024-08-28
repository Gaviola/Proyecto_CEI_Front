import UsersTable from "../components/usersTable";

export default function UsersPage() {
  return (
    <main className="h-screen">
      <UsersTable  
        users={[
          {
            name: "Gabriel",
            lastname: "Garcia",
            email: "ads",
            dni: "12345678"
          },
        ]}
      /> 
    </main>
  );
}