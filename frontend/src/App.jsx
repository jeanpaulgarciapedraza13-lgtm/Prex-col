import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Importación de componentes
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminPanel from "./pages/admin/AdminPanel";
import AdminPedidos from "./pages/admin/AdminPedidos";
import AdminUsuarios from "./pages/admin/AdminUsuarios";

import UserHome from "./pages/user/UserHome";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>

        {/* Página inicial → Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Login y registro */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas Usuario */}
        <Route path="/home" element={<UserHome />} />

        {/* Rutas Administrador */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/pedidos" element={<AdminPedidos />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />

      </Routes>
    </BrowserRouter>
  );
}
