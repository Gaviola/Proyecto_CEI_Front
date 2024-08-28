export default function UsersTable({users}) {
  return (
    <table>
    <thead className="bg-red-900">
    <tr>
        <td>Nombre</td>
        <td>Apellido</td>
        <td>Email</td>
        <td>DNI</td>
      </tr>
    </thead>
    <tbody>
      {
      users.map((user, key) => (
        <tr key={key}>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td>{user.email}</td>
          <td>{user.dni}</td>
        </tr>
      ))}
    </tbody>
  </table>
  );
}