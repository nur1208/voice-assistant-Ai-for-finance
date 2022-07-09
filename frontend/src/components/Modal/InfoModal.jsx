import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const InfoModal = ({ title, content }) => {
  const { renderContent } = useSelector(
    (state) => state.modal_store
  );
  return (
    <Box sx={style}>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        {title}
      </Typography>
      {/* {typeof content === "function" ? content() : null} */}
      {/* {new Array(5).fill(true).map((_, index) => (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {index + 1} - symbol: AAPL, company name: Apple inc.
            </Typography>
          ))} */}
      {renderContent ? (
        renderContent()
      ) : typeof content === "object" ? (
        content.map(({ symbol, name }, index) => (
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {index + 1} - symbol: {symbol}
            {name && <span>, company name: {name}</span>}
          </Typography>
        ))
      ) : (
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {content}
        </Typography>
      )}
    </Box>
  );
};
