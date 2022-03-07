import * as React from "react";

import Modal from "@mui/material/Modal";
import { InfoModal } from "./InfoModal";
import InputModal from "./InputModal/InputModal";
import { ProgressModal } from "./ProgressModal/ProgressModal";
export default function BasicModal({
  open,
  handleClose,
  title,
  content,
  isInput,
  label,
  isProgress,
  progressData,
}) {
  //   const [open, setOpen] = React.useState(false);
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () => setOpen(false);

  const infoModalProps = { title, content };
  const inputModalProps = { handleClose, label };
  const progressModalProps = { progressData };
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
        {isProgress ? (
          <ProgressModal {...progressModalProps} />
        ) : isInput ? (
          <InputModal {...inputModalProps} />
        ) : (
          <InfoModal {...infoModalProps} />
        )}
      </Modal>
    </div>
  );
}
