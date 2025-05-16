import { FaGoogle, FaFacebookF, FaGithub } from "react-icons/fa";

function Login() {
  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/api/auth/google`, "_self");
  };

  const handleGithubLogin = () => {
    window.open(`${import.meta.env.VITE_SERVER_URL}/api/auth/github`, "_self");
  };

  const handleFacebookLogin = () => {
    alert(
      "Since I don't have a facebook account, I could not implement login with facebook functionality."
    );
  };

  return (
    <div className="max-w-sm sm:max-w-lg mx-auto p-8 rounded-md shadow-2xl mt-40">
      <h1 className="text-3xl font-bold text-center mb-8">
        Log in to Unsplash Explorer
      </h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleGoogleLogin}
          className="w-76 mx-auto flex items-center justify-center gap-3 bg-red-600 text-white font-medium py-2 rounded-md hover:scale-105 duration-300"
        >
          <FaGoogle size={20} />
          Sign in with Google
        </button>

        <button
          onClick={handleGithubLogin}
          className="w-76 mx-auto flex items-center justify-center gap-3 bg-black text-white font-medium py-2 rounded-md hover:scale-105 duration-300"
        >
          <FaGithub size={20} />
          Sign in with GitHub
        </button>

        <button
          onClick={handleFacebookLogin}
          className="w-76 mx-auto flex items-center justify-center gap-3 bg-blue-700 text-white font-medium py-2 rounded-md hover:scale-105 duration-300"
        >
          <FaFacebookF size={20} />
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}

export default Login;
