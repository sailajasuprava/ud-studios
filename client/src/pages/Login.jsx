function Login() {
  const handleLogin = () => {
    window.open("http://localhost:8000/api/auth/google", "_self");
  };

  return (
    <div className="max-w-sm sm:max-w-lg mx-auto p-8 rounded-md shadow-2xl mt-40">
      <h1 className="text-3xl font-bold"> Log in to Unsplash Explorer</h1>

      <button
        onClick={handleLogin}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full transition duration-300 shadow-md"
      >
        Login with Google
      </button>
      <br />
      <a href="http://localhost:8000/api/auth/github">Login with GitHub</a>
      <br />
      <a href="http://localhost:8000/api/auth/facebook">Login with Facebook</a>
    </div>
  );
}

export default Login;
