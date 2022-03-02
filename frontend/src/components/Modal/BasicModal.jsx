import * as React from "react";

import Modal from "@mui/material/Modal";
import { InfoModal } from "./InfoModal";

export default function BasicModal({
  open,
  handleClose,
  title,
  content,
}) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  const infoModalProps = { title, content };
  console.log({ infoModalProps, title, content });

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <InfoModal {...infoModalProps} />
      </Modal>
    </div>
  );
}
