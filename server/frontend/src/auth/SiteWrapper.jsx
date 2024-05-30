import { createContext, useContext, useState } from "react";
const SiteContext = createContext();

import io from "socket.io-client";
const socket = io.connect("http://localhost:4000", {
  transports: ["websocket"],
});
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
    <SiteContext.Provider value={{ user, login, logout, signup, socket }}>
      {children}
    </SiteContext.Provider>
  );
};
