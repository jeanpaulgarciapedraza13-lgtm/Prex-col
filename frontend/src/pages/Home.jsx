function Home() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={{ margin: "30px" }}>
      <h1>Bienvenido a Prex-col</h1>

      {role === "admin" ? (
        <h2>Panel Administrador</h2>
      ) : (
        <h2>Panel Usuario</h2>
      )}

      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Home;
