import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Paper,
  InputBase,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CollectionsIcon from '@mui/icons-material/Collections';
import { styled } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import MicIcon from "@mui/icons-material/Mic";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { green } from "@mui/material/colors";
import { ReactMediaRecorder } from "react-media-recorder";
import api from "../../services";
import { useMessages } from "../../context/messageChat";

const MainWrapper = styled(Paper)({
  background: "#eee",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
});

const NewMessageBox = styled("div")({
  background: "#eee",
  width: "100%",
  display: "flex",
  padding: "7px",
  alignItems: "center",
});

const MessageInputWrapper = styled("div")({
  padding: 6,
  marginRight: 7,
  background: "#fff",
  display: "flex",
  borderRadius: 20,
  flex: 1,
});

const MessageInputField = styled(InputBase)({
  paddingLeft: 10,
  flex: 1,
  border: "none",
});

const SendMessageIcons = styled(IconButton)({
  color: "grey",
});

const UploadInput = styled("input")({
  display: "none",
});

const ViewMediaInputWrapper = styled(Paper)({
  display: "flex",
  padding: "10px 13px",
  position: "relative",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#eee",
  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
});

const CircleLoading = styled(CircularProgress)({
  color: green[500],
  opacity: "70%",
  position: "absolute",
  top: "20%",
  left: "50%",
  marginLeft: -12,
});

const RecorderWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: 'pointer',
  gap: 10,
  color: '#333',
});

const StyledMenuItem = styled(MenuItem)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px', // Espaçamento entre o ícone e o texto
  color: '#333', // Cor do texto
  '& svg': {
    fontSize: '1.2rem', // Ajuste do tamanho do ícone
  }
});


const CustomMenu = styled(Menu)({
  padding: 0,
  '& .MuiPaper-root': {
    padding: '10px 15px',
    borderRadius: '10px',
    marginTop: '-70px',
  },
  '& .MuiMenu-list': {
    gap: '15px',
    display: 'flex',
    flexDirection: 'column'
  }
});

const SendAudioIcon = styled(CheckCircleOutlineIcon)({
  color: "green",
});

const MessageInput: React.FC<any> = () => {
  const { ticketId } = useParams<{ ticketId: string; }>();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [recording, setRecording] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const { updateMessage, setLoadingRequest } = useMessages();

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
    return () => {
      setInputMessage("");
    };
  }, [ticketId]);

  const generateRandomId = (name: string) => {
    return `${name}${Math.random().toString().split('.')[1]}`;
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;
    setLoading(true);

    const objPost = { message: inputMessage.trim() };

    try {

      const sentMessage = { id: generateRandomId("chat"), fromMe: true, body: inputMessage.trim(), createdAt: new Date().toISOString() };
      updateMessage(sentMessage);
      setLoadingRequest(true);

      const { data } = await api.post(`/chathand-message`, objPost);

      const receivedMessage = { id: generateRandomId("chat"), fromMe: false, body: data.message, createdAt: new Date().toISOString() };
      updateMessage(receivedMessage);
      setLoadingRequest(false);

    } catch (err) {
      console.log(err);
    }

    setInputMessage("");
    setLoading(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUploadAudio = async (mediaBlobUrl?: string) => {
    if (!mediaBlobUrl) return;

    console.log("mediaBlobUrl", mediaBlobUrl);

    try {
      setLoading(true);

      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();

      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Audio = reader.result as string;

        localStorage.setItem("savedAudio", base64Audio);

        const audioUrl = URL.createObjectURL(blob);
        updateMessage({
          id: generateRandomId("audio"),
          fromMe: true,
          body: audioUrl,
          mediaType: "audio",
          createdAt: new Date().toISOString(),
        });
      };

      const formData = new FormData();
      const audioFile = new File([blob], "audio.mp3", { type: "audio/mp3" });
      formData.append("file", audioFile);

      const { data } = await api.post("/chathand-voice", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      updateMessage({ id: generateRandomId("audio"), fromMe: false, body: data.message, createdAt: new Date().toISOString() });

    } catch (error) {
      console.error("Erro ao enviar áudio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <MainWrapper square elevation={0}>
      <NewMessageBox>
        <IconButton aria-label="upload" component="span" onClick={handleClick} disabled={loading || recording}>
          <SendMessageIcons>
            <AddIcon />
          </SendMessageIcons>
        </IconButton>
        <CustomMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <StyledMenuItem>
            <label htmlFor="image-upload" >
              <RecorderWrapper>
                <CollectionsIcon />
                <span style={{ fontSize: 14 }}>Áudio</span>
              </RecorderWrapper>

              <UploadInput
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </StyledMenuItem>
          <StyledMenuItem>
            <ReactMediaRecorder
              audio
              render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                <label htmlFor="audio-upload">
                  <RecorderWrapper>
                    <IconButton
                      aria-label="startRecording"
                      component="span"
                      disabled={loading}
                      onClick={() => {
                        setRecording(true);
                        startRecording();
                      }}
                      style={{ padding: 0 }}
                    >
                      <RecorderWrapper>
                        <MicIcon /> <span style={{ fontSize: 14 }}>Áudio</span>
                      </RecorderWrapper>
                    </IconButton>

                    {status === "recording" && (
                      <IconButton
                        aria-label="stopRecording"
                        component="span"
                        disabled={loading}
                        onClick={() => {
                          stopRecording();
                          setRecording(false);
                          handleUploadAudio(mediaBlobUrl);
                        }}
                      >

                        <SendAudioIcon />
                      </IconButton>
                    )}
                  </RecorderWrapper>
                </label>
              )}
            />

          </StyledMenuItem>
        </CustomMenu>

        <MessageInputWrapper>
          <MessageInputField
            ref={inputRef}
            placeholder="Digite uma mensagem"
            multiline
            maxRows={5}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={recording || loading}
            onKeyPress={(e) => {
              if (loading || e.shiftKey) return;
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
        </MessageInputWrapper>
        {inputMessage ? (
          <IconButton
            aria-label="sendMessage"
            component="span"
            disabled={loading}
            onClick={handleSendMessage}
          >
            <SendMessageIcons>
              <SendIcon />
            </SendMessageIcons>
          </IconButton>
        ) : (
          <ReactMediaRecorder
            audio={true}
            mediaRecorderOptions={{ mimeType: 'audio/webm' }}
            render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
              <RecorderWrapper>
                <IconButton
                  aria-label="startRecording"
                  component="span"
                  disabled={loading}
                  onClick={() => {
                    // setRecording(true);
                    startRecording();
                  }}
                >
                  <SendMessageIcons>
                    <MicIcon />
                  </SendMessageIcons>
                </IconButton>


                {status === "recording" && (
                  <IconButton
                    aria-label="stopRecording"
                    component="span"
                    disabled={loading}
                    onClick={() => {
                      setRecording(false);
                      stopRecording();
                      handleUploadAudio(mediaBlobUrl);
                    }}
                  >
                    <SendAudioIcon />
                  </IconButton>
                )}
              </RecorderWrapper>
            )}
          />
        )}
      </NewMessageBox>
    </MainWrapper >
  );
};

export default MessageInput;
