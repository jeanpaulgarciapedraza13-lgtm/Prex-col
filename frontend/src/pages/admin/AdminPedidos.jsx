// src/pages/admin/AdminPedidos.jsx
import React, { useEffect, useState } from "react";

export default function AdminPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const token = localStorage.getItem("token");

  // Cargar todos los pedidos
  const cargarPedidos = async () => {
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

  useEffect(() => {
    cargarPedidos();
  }, []);

  // Actualizar estado
  const actualizarPedido = async (codigo) => {
    const nuevoEstado = prompt("Ingrese nuevo estado: pendiente, en_camino, entregado, cancelado");
    if (!nuevoEstado) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/pedidos/update/${codigo}/`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      const data = await res.json();
      setMensaje(data.message);
      cargarPedidos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al actualizar pedido");
    }
  };

  // Eliminar pedido
  const eliminarPedido = async (codigo) => {
    if (!window.confirm("¿Seguro que quieres eliminar este pedido?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/pedidos/delete/${codigo}/`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setMensaje(data.message);
      cargarPedidos();
    } catch (error) {
      console.error(error);
      setMensaje("Error al eliminar pedido");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Todos los Pedidos (Admin)</h2>
      {mensaje && <p>{mensaje}</p>}
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Código</th>
            <th>Cliente</th>
            <th>Estado</th>
            <th>Usuario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.codigo}>
              <td>{p.codigo}</td>
              <td>{p.nombre_cliente}</td>
              <td>{p.estado}</td>
              <td>{p.usuario}</td>
              <td>
                <button onClick={() => actualizarPedido(p.codigo)}>Actualizar</button>
                <button onClick={() => eliminarPedido(p.codigo)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
