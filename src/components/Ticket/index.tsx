import { useEffect } from "react";

import MessagesList from "../MessagesList";
import MessageInput from "../MessageInput";
import { useMessages } from "../../context/messageChat";
import ChatbotImage from "../../assets/imagem.jfif";
import ChatHeader from "../ChatHeader";
import * as Styled from './styles';


const Ticket = () => {

  const { addMessage } = useMessages();

  const getLocalStorageMessage = () => {
    const storedTicket = localStorage.getItem("messages");
    if (storedTicket && storedTicket !== 'null' && storedTicket !== 'undefined') {
      return JSON.parse(storedTicket);
    }
    return {};
  };

  useEffect(() => {
    const fetchedTicket = getLocalStorageMessage();
    if (fetchedTicket && Object.keys(fetchedTicket).length > 0) {
      addMessage(fetchedTicket);
    }
  }, []);

  const renderMessagesList = () => {
    return (
      <Styled.MessagesListWrapper>
        <ChatHeader avatarUrl={ChatbotImage} title="Chatbot Mão na Massa" />
        <MessagesList />
        <MessageInput />
      </Styled.MessagesListWrapper>
    );
  };

  return (
    <Styled.Root id="drawer-container">
      <Styled.MainWrapper>{renderMessagesList()}</Styled.MainWrapper>
    </Styled.Root>
  );
};

export default Ticket;
