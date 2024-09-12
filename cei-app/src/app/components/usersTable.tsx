export default function UsersTable({users}: {users: any[]}) {
  return (
    <div className="w-full border-1 px-4 py-1 rounded-lg bg-white">
      <table className="w-full">
        <thead className="w-full">
          <tr className="font-bold w-full border-b-1 py-1 border-gray-600 h-10">
            <td className="w-1/5">Nombre</td>
            <td className="w-1/5">Apellido</td>
            <td className="w-2/5">Email</td>
            <td className="w-1/5">DNI</td>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user: any, key: any) => (
              <tr key={key} className={`border-gray-300 h-10 ${key !== users.length - 1 ? 'border-b-1 ' : ''}`}>
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