// import * as React from "react";

import Modal from "@mui/material/Modal";
import { useSelector } from "react-redux";
import { renderModal } from "./BasicModalUtils";

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

  const { type, open: openRedux } = useSelector(
    (state) => state.modal_store
  );
  const infoModalProps = { title, content };
  const inputModalProps = { handleClose, label };
  const progressModalProps = { progressData };
  console.log({ infoModalProps, title, content });

  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={openRedux || open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {renderModal(
          type,
          {
            ...infoModalProps,
            ...inputModalProps,
            ...progressModalProps,
          },
          { isProgress, isInput }
        )}
        {/* {isProgress || type === MODAL_TYPE_OPTIONS.PROGRESS ? (
          <ProgressModal {...progressModalProps} />
        ) : isInput || type === MODAL_TYPE_OPTIONS.INPUT ? (
          <InputModal {...inputModalProps} />
        ) : (
          <InfoModal {...infoModalProps} />
        )} */}
      </Modal>
    </div>
  );
}
