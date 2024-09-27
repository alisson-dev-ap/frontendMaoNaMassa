import React, { createContext, useContext, ReactNode, useState, useEffect, Dispatch, SetStateAction } from 'react';

interface Message {
  id: string;
  fromMe: boolean;
  body: string;
  createdAt: string;
}

interface MessagesContextProps {
  messagesChat: Message[];
  addMessage: (message: Message) => void;
  resetMessages: () => void;
  updateMessage: (message: Message) => void;
  loadingRequest: boolean;
  setLoadingRequest: Dispatch<SetStateAction<boolean>>;
}

const MessagesContext = createContext<MessagesContextProps | undefined>(undefined);

export const MessagesProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {

  const [loadingRequest, setLoadingRequest] = useState(false);

  const [messagesChat, setMessagesChat] = useState<any[]>(() => {
    const storedMessages = localStorage.getItem('messages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });

  const getLocalStorageMessage = () => {
    const storedTicket = localStorage.getItem("messages");
    if (storedTicket && storedTicket !== 'null' && storedTicket !== 'undefined') {
      return JSON.parse(storedTicket);
    }
    return {};
  };

  const addMessage = () => {
    const fetchedTicket = getLocalStorageMessage();
    if (fetchedTicket && Object.keys(fetchedTicket).length > 0) {
      localStorage.setItem('messages', JSON.stringify(fetchedTicket));
      setMessagesChat(fetchedTicket);
    }
  };


  const updateMessage = (message: Message) => {
    setMessagesChat((prevMessages) => {
      const messagesWithoutTemp = prevMessages.filter(
        (msg) => msg.id !== "mensagem_temporaria"
      );

      const updatedMessages = [...messagesWithoutTemp, message];
      localStorage.setItem("messages", JSON.stringify(updatedMessages));

      return updatedMessages;
    });
  };

  const resetMessages = () => {
    setMessagesChat([]);
    localStorage.removeItem('messages');
  };

  return (
    <MessagesContext.Provider value={{ messagesChat, addMessage, resetMessages, updateMessage, setLoadingRequest, loadingRequest }}>
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessagesProvider');
  }
  return context;
};