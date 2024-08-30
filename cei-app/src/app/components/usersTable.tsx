export default function UsersTable({users}: {users: any[]}) {
  return (
    <div 
      style={{
        width: '100%',
        border: '1px solid #ccc',
        padding: '10px 8px',
        borderRadius: '10px',
      }}>
      <table className="w-full">
        <thead className="w-full">
          <tr className="font-bold  w-full border-b-1 py-1 border-gray-800">
            <td className="w-1/5">Nombre</td>
            <td className="w-1/5">Apellido</td>
            <td className="w-2/5">Email</td>
            <td className="w-1/5">DNI</td>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user: any, key: any) => (
              <tr key={key}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.idNumber}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}