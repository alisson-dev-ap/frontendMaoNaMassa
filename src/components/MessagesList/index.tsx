import React, { useState, useEffect, useRef } from "react";
import { parseISO, format } from "date-fns";

import { Avatar, Typography } from "@mui/material";

import { AccessTime, Done, DoneAll } from "@mui/icons-material";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import MessageOptionsMenu from "../MessageOptionsMenu";
import MarkdownWrapper from "../MarkdownWrapper";
import { useMessages } from "../../context/messageChat";

import * as Styled from './styles';

const MessagesList = () => {

  const { messagesChat, loadingRequest, updateMessage } = useMessages();

  const [messagesList, setMessageList] = useState<any>();
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const messageOptionsMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (loadingRequest) {
      const sentMessage = { id: "mensagem_temporaria", fromMe: false, body: "...", createdAt: new Date().toISOString() };
      updateMessage(sentMessage);
    }
  }, [loadingRequest]);

  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      try {
        const storedMessages = localStorage.getItem("messages") || "[]";
        const parsedMessages = JSON.parse(storedMessages);

        setMessageList(parsedMessages);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        alert("Erro ao carregar mensagens: " + err);
      }
    };

    fetchMessages();

  }, [messagesChat]);

  const handleCloseMessageOptionsMenu = () => {
    setAnchorEl(null);
  };

  const messageLocation = (message: any, createdAt: any) => {
    return (
      <Styled.TextContentItem>
        <div style={{ display: 'flex', padding: 5 }}>
          <Styled.ImageLocation>
            <img src={message.split('|')[0]} />
          </Styled.ImageLocation>
          <a
            style={{ fontWeight: '700', color: 'gray' }}
            target="_blank"
            href={message.split('|')[1]}> Clique para ver localização</a>
          <Styled.Timestamp>
            <span>
              {format(parseISO(createdAt), "HH:mm")}
            </span>
          </Styled.Timestamp>
        </div>
      </Styled.TextContentItem>
    );
  };

  const renderMessageDivider = (message: any, index: number) => {
    if (index < messagesList.length && index > 0) {
      let messageUser = messagesList[index].fromMe;
      let previousMessageUser = messagesList[index - 1].fromMe;

      if (messageUser !== previousMessageUser) {
        return (
          <span style={{ marginTop: 16 }} key={`divider-${message.id}`}></span>
        );
      }
    }
  };

  const checkMessageMedia = (message: any) => {
    // if (message.mediaType === "image") {
    //   return <ModalImageCors imageUrl={message.mediaUrl} />;
    // }
    if (message.mediaType === "audio") {
      return (
        <audio controls>
          <source src={message.mediaUrl} type="audio/ogg"></source>
        </audio>
      );
    }
  };

  const isVCard = (message: any) => {
    return message.includes('BEGIN:VCARD');
  };

  const vCard = (message: any) => {
    const name = message?.substring(message.indexOf("N:;") + 3, message.indexOf(";;;"));
    const description = message?.substring(message.indexOf("TION:") + 5, message.indexOf("TEL"));
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
          <Avatar style={{ marginRight: 10, marginLeft: 20, width: 60, height: 60 }} />
          <div style={{ width: 350 }}>
            <div>
              <Typography
                noWrap
                component="h4"
                variant="body2"
                color="textPrimary"
                style={{ fontWeight: '700' }}
              >
                {name}
              </Typography>
            </div>

            <div style={{ width: 350 }}>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
                style={{ display: 'flex' }}
              >
                {description}
              </Typography>
            </div>
          </div>

        </div>
        <div style={{
          width: '100%', display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          borderWidth: '1px 0 0 0',
          borderTopColor: '#bdbdbd',
          borderStyle: 'solid',
          padding: 8
        }}>
          <Typography
            noWrap
            component="h4"
            variant="body2"
            color="textPrimary"
            style={{ fontWeight: '700', color: '#2c9ce7' }}
          >
            Conversar
          </Typography>
        </div>
      </div>
    );
  };

  const renderMessageAck = (message: any) => {
    if (message.visibility === false) {
      return <Styled.AckIcons><VisibilityOffIcon fontSize="small" /></Styled.AckIcons>;
    }
    if (message.ack === 0) {
      return <Styled.AckIcons><AccessTime fontSize="small" /></Styled.AckIcons >;
    }
    if (message.ack === 1) {
      return <Styled.AckIcons><Done fontSize="small" /></Styled.AckIcons >;
    }
    if (message.ack === 2) {
      return <Styled.AckIcons><DoneAll fontSize="small" /></Styled.AckIcons >;
    }
    if (message.ack === 3 || message.ack === 4) {
      return <Styled.AckDoneAllIcon><DoneAll fontSize="small" /></Styled.AckDoneAllIcon >;
    }
  };

  const renderMessages = () => {
    if (messagesList?.length > 0) {
      return messagesList?.map((message: any, index: any) => {
        const isFromMe = message.fromMe;

        return (
          <React.Fragment key={message.id}>
            {renderMessageDivider(message, index)}
            {!isFromMe ? (
              <Styled.MessageLeft>
                <div>
                  {/* {message.mediaUrl && checkMessageMedia(message)} */}
                  {message.body.includes('data:image') ? (
                    messageLocation(message.body, message.createdAt)
                  ) : isVCard(message.body) ? (
                    <Styled.TextContentItem>{vCard(message.body)}</Styled.TextContentItem>
                  ) : (
                    <Styled.TextContentItem>
                      <MarkdownWrapper>{message.body}</MarkdownWrapper>
                      <Styled.Timestamp>
                        {message.createdAt ? format(parseISO(message.createdAt), "HH:mm") : "Invalid date"}
                      </Styled.Timestamp>
                    </Styled.TextContentItem>
                  )}
                </div>
              </Styled.MessageLeft>
            ) : (
              <Styled.MessageRight>
                <Styled.TextContentItem>
                  {message.body.includes('data:image') ? (
                    messageLocation(message.body, message.createdAt)
                  ) : isVCard(message.body) ? (
                    <Styled.TextContentItem>{vCard(message.body)}</Styled.TextContentItem>
                  ) : (
                    <MarkdownWrapper>{message.body}</MarkdownWrapper>
                  )}
                  <Styled.Timestamp>
                    {message.createdAt ? format(parseISO(message.createdAt), "HH:mm") : "Invalid date"}
                    {renderMessageAck(message)}
                  </Styled.Timestamp>
                </Styled.TextContentItem>
              </Styled.MessageRight>
            )}
          </React.Fragment>
        );
      });
    } else {
      return <div>Diga alguma coisa</div>;
    }
  };

  return (
    <Styled.MessagesListWrapper>
      <MessageOptionsMenu
        message={messagesList}
        anchorEl={anchorEl}
        menuOpen={messageOptionsMenuOpen}
        handleClose={handleCloseMessageOptionsMenu}
      />
      <Styled.MessagesListContainer>
        {renderMessages()}
      </Styled.MessagesListContainer>
      {loading && <Styled.CircleLoading />}
    </Styled.MessagesListWrapper>
  );
};

export default MessagesList;
