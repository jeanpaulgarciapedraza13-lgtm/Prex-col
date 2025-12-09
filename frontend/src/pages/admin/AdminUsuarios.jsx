import { useEffect, useState } from "react";

function AdminUsuarios() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/users/list/")
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Gestión de Usuarios</h2>

      <table style={{ width: "100%", border: "1px solid black" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default AdminUsuarios;
