// src/api/pedidos.js

export const listarPedidos = async (token) => {
  const res = await fetch("http://127.0.0.1:8000/pedidos/list/", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  return await res.json();
};

export const actualizarPedido = async (codigo, estado, token) => {
  const res = await fetch(`http://127.0.0.1:8000/pedidos/update/${codigo}/`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ estado })
  });
  return await res.json();
};

export const eliminarPedido = async (codigo, token) => {
  const res = await fetch(`http://127.0.0.1:8000/pedidos/delete/${codigo}/`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  return await res.json();
};
