import { useState } from "react";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    first_name: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async () => {
    const res = await fetch("http://127.0.0.1:8000/users/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log(data);
    alert("Usuario registrado correctamente");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h2>Registrarse</h2>

      <input name="first_name" placeholder="Nombre" onChange={handleChange} /> <br />
      <input name="email" placeholder="Correo" onChange={handleChange} /> <br />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} /> <br />

      <button onClick={registerUser}>Enviar</button>
    </div>
  );
}

export default Register;
