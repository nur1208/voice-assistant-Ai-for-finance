import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { useReduxActions } from "../hooks/useReduxActions";

export const MessagePopup = (props) => {
  const { setMessagePopupData } = useReduxActions();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    // props.setOpen(false);
    setMessagePopupData({ open: false });
  };

  const { messageData } = useSelector(
    (state) => state.modal_store
  );

  return (
    <Snackbar
      open={messageData?.open}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert
        onClose={handleClose}
        severity={messageData?.severity}
      >
        {messageData?.message}
      </Alert>
    </Snackbar>
  );
};
