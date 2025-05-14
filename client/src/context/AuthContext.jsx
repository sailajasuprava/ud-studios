import { createContext, useContext, useEffect, useState } from "react";
import axios from "../lib/axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  console.log(auth);

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

  return (
    <AuthContext.Provider value={{ auth, setAuth, fetchUser }}>
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
