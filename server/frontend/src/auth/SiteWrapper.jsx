import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
const SiteContext = createContext();

import io from "socket.io-client";
const socket = io.connect("https://pm2-jcr4.onrender.com");
socket.on("connect_error", (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message);

  // some additional description, for example the status code of the initial HTTP response
  console.log(err.description);

  // some additional context, for example the XMLHttpRequest object
  console.log(err.context);
});

//SiteData sera el objeto donde guardaremos los datos
export const SiteData = () => useContext(SiteContext);

export const SiteWrapper = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleUserData = (data) => {
    setUser(data);
    data.roles.includes("admin") ? socket.emit("join-admin-room") : null;
    toast.success(`Bienvenido, ${data.username}`);
  };

  const logout = () => {
    user.roles.includes("admin") ? socket.emit("leave-admin-room") : null;
    setUser(null);
  };

  const handleError = (error) => {
    toast.error(error);
  };

  useEffect(() => {
    socket.on("error", handleError);
    return () => {
      socket.off("error", handleError);
    };
  }, []);

  return (
    <SiteContext.Provider value={{ user, handleUserData, logout, socket }}>
      {children}
    </SiteContext.Provider>
  );
};
