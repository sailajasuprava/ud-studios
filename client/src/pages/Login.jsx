function Login() {
  const handleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1> Welcome to Unsplash Explorer</h1>
      <p>Please login with one of the providers below:</p>

      <button onClick={handleLogin}>Login with Google</button>
      <br />
      <a href="http://localhost:8000/api/auth/github">Login with GitHub</a>
      <br />
      <a href="http://localhost:8000/api/auth/facebook">Login with Facebook</a>
    </div>
  );
}

export default Login;
