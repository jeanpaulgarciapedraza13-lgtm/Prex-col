import { useEffect, useState } from "react";

function AdminPanel() {
  const [pedidos, setPedidos] = useState([]);

  const obtenerPedidos = async () => {
    const res = await fetch("http://127.0.0.1:8000/pedidos/list/");
    const data = await res.json();
    setPedidos(data);
  };

  const actualizarEstado = async (codigo, estado) => {
    await fetch(`http://127.0.0.1:8000/pedidos/update/${codigo}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado })
    });
    obtenerPedidos();
  };

  const eliminarPedido = async (codigo) => {
    await fetch(`http://127.0.0.1:8000/pedidos/delete/${codigo}/`, {
      method: "DELETE",
    });
    obtenerPedidos();
  };

  useEffect(() => {
    obtenerPedidos();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Panel Administrador - Gestión de Pedidos</h2>

      {pedidos.map(p => (
        <div key={p.codigo} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
          <p><b>Código:</b> {p.codigo}</p>
          <p><b>Cliente:</b> {p.nombre_cliente}</p>
          <p><b>Tel:</b> {p.telefono}</p>
          <p><b>Estado:</b> {p.estado}</p>

          <button onClick={() => actualizarEstado(p.codigo, "en_camino")}>En camino</button>
          <button onClick={() => actualizarEstado(p.codigo, "entregado")}>Entregado</button>
          <button onClick={() => actualizarEstado(p.codigo, "cancelado")}>Cancelar</button>
          <button onClick={() => eliminarPedido(p.codigo)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
