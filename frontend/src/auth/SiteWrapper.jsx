import { createContext, useContext, useState } from "react";
const SiteContext = createContext();
import socket from "../sockets";

//SiteData sera el objeto donde guardaremos los datos
export const SiteData = () => useContext(SiteContext);

export const SiteWrapper = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (loginData) => {
    socket.emit("client_login", loginData);

    socket.on("server_login", (data) => {
      setUser(data);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (signupData) => {
    socket.emit("client_signup", signupData);
    socket.on("server_signup", (data) => {
      setUser(data);
    });
  };

  return (
    <SiteContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </SiteContext.Provider>
  );
};
