import { createContext, useContext, useEffect, useState } from "react";

const MapPageContext = createContext();
export const MapPageData = () => useContext(MapPageContext);

export const MapPageWrapper = ({ children }) => {
  const [chatActivo, setChatActivo] = useState();

  const handleChatActivo = (chatId) => {
    setChatActivo(chatId);
  };

  return (
    <MapPageContext.Provider value={{ chatActivo, handleChatActivo }}>
      {children}
    </MapPageContext.Provider>
  );
};
