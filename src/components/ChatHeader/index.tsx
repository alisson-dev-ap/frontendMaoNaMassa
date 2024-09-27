import React from 'react';
import styled from 'styled-components';

interface ChatHeaderProps {
  avatarUrl: string;
  title: string;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #26c6da;
  color: white;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin: 0;
  font-weight: normal;
`;

const ChatHeader: React.FC<ChatHeaderProps> = ({ avatarUrl, title }) => {
  return (
    <HeaderContainer>
      <Avatar src={avatarUrl} alt="Chatbot Avatar" />
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

export default ChatHeader;