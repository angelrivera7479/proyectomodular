import { createContext, useContext, useEffect, useState } from "react";
import { SiteData } from "../auth/SiteWrapper";

const MapPageContext = createContext();
export const MapPageData = () => useContext(MapPageContext);

export const MapPageWrapper = ({ children }) => {
  const [chatActivo, setChatActivo] = useState();
  const { socket } = SiteData();

  const handleChatActivo = (chatId) => {
    setChatActivo(chatId);
    socket.emit("client_getQuestionsList", chatId);
  };
  const getQuestionsList = (questionsList) => {
    console.log(questionsList);
  };

  useEffect(() => {
    //socket.emit("client_setQuestionsList", chatId);
    socket.on("server_getQuestionsList", getQuestionsList);

    return () => {
      socket.off("server_getQuestionsList", getQuestionsList);
    };
  }, [chatActivo]);

  return (
    <MapPageContext.Provider
      value={{ chatActivo, setChatActivo, handleChatActivo }}
    >
      {children}
    </MapPageContext.Provider>
  );
};
