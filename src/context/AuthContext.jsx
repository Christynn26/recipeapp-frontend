import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("auth")) {
      setAuth(JSON.parse(sessionStorage.getItem("auth")));
    }
  }, []);

  const value = {
    auth,
    setAuth,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};
