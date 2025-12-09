import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Error en el login");
        return;
      }

      // Guardamos los datos en localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("user_id", data.user_id);

      // Redirección según rol
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      alert("Error de conexión con el servidor");
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Iniciar Sesión</h2>

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Correo" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Ingresar</button>
      </form>

      {/* ⭐⭐⭐ BOTÓN PARA REGISTRAR ⭐⭐⭐ */}
      <br />
      <p>¿No tienes cuenta?</p>
      <button onClick={() => navigate("/register")}>
        Registrarme
      </button>
    </div>
  );
}

export default Login;
