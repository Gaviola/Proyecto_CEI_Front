export default function UsersTable({users}: {users: any[]}) {
  return (
    <div 
      style={{
        width: '100%',
        border: '1px solid #ccc',
        padding: '10px 8px',
        borderRadius: '10px',
      }}>
      <table style={{width: '100%'}}>
      <thead className="font-bold">
        <tr>
          <td width={"20%"}>Nombre</td>
          <td width={"20%"}>Apellido</td>
          <td width={"40%"}>Email</td>
          <td width={"20%"}>DNI</td>
        </tr>
      </thead>
        <hr style={{ border: '1px solid black', width: '100%' }} />
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