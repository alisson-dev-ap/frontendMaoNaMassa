import { styled } from "@mui/system";
import { green } from "@mui/material/colors";

import {
  CircularProgress,
  IconButton,
  Typography,
  Box,
} from "@mui/material";

export const MessagesListWrapper = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "calc(100vh - 148px)",
  minWidth: 300,
  minHeight: 500,
});

export const MessagesListContainer = styled(Box)(() => ({
  background: "linear-gradient(135deg, #e0f7fa 0%, #80deea 50%, #26c6da 100%)",
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  padding: "20px",
  height: "100%",
  overflowY: "auto",
}));

export const CircleLoading = styled(CircularProgress)(() => ({
  color: green[500],
  position: "absolute",
  opacity: "70%",
  top: 0,
  left: "50%",
  marginTop: 12,
}));

export const MessageLeft = styled(Box)({
  marginRight: 20,
  marginTop: 2,
  minWidth: 100,
  maxWidth: 600,
  height: "auto",
  display: "block",
  position: "relative",
  whiteSpace: "pre-wrap",
  backgroundColor: "#ffffff",
  color: "#303030",
  alignSelf: "flex-start",
  borderRadius: "0 8px 8px 8px",
  padding: "5px",
  boxShadow: "0 1px 1px #b3b3b3",
  "&:hover #messageActionsButton": {
    display: "flex",
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export const MessageRight = styled(Box)(() => ({
  marginLeft: 20,
  marginTop: 2,
  minWidth: 100,
  maxWidth: 600,
  height: "auto",
  display: "block",
  position: "relative",
  whiteSpace: "pre-wrap",
  backgroundColor: "#dcf8c6",
  color: "#303030",
  alignSelf: "flex-end",
  borderRadius: "8px 8px 8px 0",
  padding: "5px",
  boxShadow: "0 1px 1px #b3b3b3",
  "&.invisible": {
    backgroundColor: "#e0e4dd",
  },
  "&:hover #messageActionsButton": {
    display: "flex",
    position: "absolute",
    top: 0,
    right: 0,
  },
}));

export const MessageActionsButton = styled(IconButton)({
  display: "none",
  position: "relative",
  color: "#999",
  zIndex: 1,
  backgroundColor: "inherit",
  opacity: "90%",
  "&:hover, &.Mui-focusVisible": { backgroundColor: "inherit" },
});

export const Timestamp = styled(Typography)({
  fontSize: 11,
  position: "absolute",
  bottom: 0,
  right: 5,
  color: "#999",
});

export const TextContentItem = styled(Box)({
  overflowWrap: "break-word",
  padding: "3px 80px 6px 6px",
});

export const ImageLocation = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 80,
  borderRadius: 5
});

export const QuotedContainerLeft = styled(Box)(({ fromMe }: { fromMe: boolean; }) => ({
  margin: "-3px -80px 6px -6px",
  overflow: "hidden",
  backgroundColor: fromMe ? "#cfe9ba" : "#f0f0f0",
  borderRadius: "7.5px",
  display: "flex",
  position: "relative",
}));

export const QuotedSideColor = styled("span")(({ fromMe }: { fromMe: boolean; }) => ({
  flex: "none",
  width: "4px",
  backgroundColor: fromMe ? "#35cd96" : "#6bcbef",
}));

export const QuotedMsg = styled("div")({
  padding: 10,
  maxWidth: 300,
  height: "auto",
  whiteSpace: "pre-wrap",
  overflow: "hidden",
});

export const MessageContactName = styled("span")({
  display: "flex",
  color: "#6bcbef",
  fontWeight: 500,
});

export const AckIcons = styled("div")({
  fontSize: 18,
  verticalAlign: "middle",
  marginLeft: 4,
});

export const AckDoneAllIcon = styled("div")({
  color: green[500],
  fontSize: 18,
  verticalAlign: "middle",
  marginLeft: 4,
});