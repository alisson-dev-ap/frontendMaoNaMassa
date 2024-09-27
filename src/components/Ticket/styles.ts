import { Paper, Box } from "@mui/material";
import { styled } from "@mui/system";

export const Root = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  position: "relative",
  overflow: "hidden",
});

export const MainWrapper = styled(Paper)(({ theme }: { theme: any; }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  borderLeft: "0",
  boxShadow: theme.shadows[0],
  variant: "outlined",
  width: "100%",
  height: "100vh",
  boxSizing: "border-box",
}));

export const MessagesListWrapper = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
