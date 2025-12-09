import React, { useEffect, useState } from "react";

function UserHome() {
  const [pedidos, setPedidos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Tomamos el token guardado en localStorage
  const token = localStorage.getItem("token");

  // ==========================
  // Crear pedido
  // ==========================
  const crearPedido = async () => {
    if (!nombre || !direccion || !telefono || !descripcion) {
      setMensaje("Por favor completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/pedidos/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // JWT en el header
        },
        body: JSON.stringify({
          nombre_cliente: nombre,
          direccion,
          telefono,
          descripcion
        })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(data.message);
        limpiarFormulario();
        obtenerPedidos();
      } else {
        setMensaje(data.error || "Error al crear el pedido");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al crear el pedido");
    }
  };

  // ==========================
  // Obtener pedidos del usuario
  // ==========================
  const obtenerPedidos = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/pedidos/list/", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error(error);
      setMensaje("Error al cargar pedidos");
    }
  };

  // ==========================
  // Limpiar formulario
  // ==========================
  const limpiarFormulario = () => {
    setNombre("");
    setDireccion("");
    setTelefono("");
    setDescripcion("");
  };

  useEffect(() => {
    if (!token) {
      setMensaje("No estás autenticado");
      return;
    }
    obtenerPedidos();
  }, [token]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Crear Pedido</h2>
      {mensaje && <p>{mensaje}</p>}

      <input 
        placeholder="Nombre cliente" 
        value={nombre} 
        onChange={e => setNombre(e.target.value)} 
      />
      <input 
        placeholder="Dirección" 
        value={direccion} 
        onChange={e => setDireccion(e.target.value)} 
      />
      <input 
        placeholder="Teléfono" 
        value={telefono} 
        onChange={e => setTelefono(e.target.value)} 
      />
      <textarea 
        placeholder="Descripción" 
        value={descripcion} 
        onChange={e => setDescripcion(e.target.value)} 
      />
      <button onClick={crearPedido}>Crear Pedido</button>

      <hr />

      <h3>Mis Pedidos</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.codigo}>
              <td>{p.codigo}</td>
              <td>{p.nombre_cliente}</td>
              <td>{p.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserHome;
