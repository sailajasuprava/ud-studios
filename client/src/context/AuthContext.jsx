import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setAuth(res.data.user);
    } catch (err) {
      setAuth(null);
      console.log(err?.response?.data?.message || err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      setAuth(null);
    } catch (err) {
      console.log(err.message);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, fetchUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext used outside of provider.");
  return context;
}

export default AuthProvider;
