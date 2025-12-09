import React, { useState } from "react";
import { crearPedido } from "../api/pedidos";

export default function CrearPedido({ token, onPedidoCreado }) {
  const [form, setForm] = useState({
    nombre_cliente: "",
    direccion: "",
    telefono: "",
    descripcion: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await crearPedido(form, token);
    alert(result.message);
    onPedidoCreado(); // recargar lista de pedidos
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre_cliente" placeholder="Nombre cliente" onChange={handleChange} required />
      <input name="direccion" placeholder="Dirección" onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" onChange={handleChange} required />
      <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
      <button type="submit">Crear Pedido</button>
    </form>
  );
}
