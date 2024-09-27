import MenuItem from "@mui/material/MenuItem";

import { Menu } from "@mui/material";

const MessageOptionsMenu = (props: any) => {

  const { message, menuOpen, handleClose, anchorEl } = props;

  const handleOpenConfirmationModal = () => {
    handleClose();
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}

        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={menuOpen}
        onClose={handleClose}
      >
      </Menu>
    </>
  );
};

export default MessageOptionsMenu;
