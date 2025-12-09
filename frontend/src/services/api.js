import axios from "axios";

const API_URL = "http://127.0.0.1:8000/pedidos/";

export async function getPedidos() {
  const response = await fetch(API_URL);
  return await response.json();
}

