import React from "react";
import { Alert, Snackbar } from "@mui/material";

export default function Toaster({ message, open, handleClose }) {
  return (
    <div sx={{ right: "0" }}>
      <Snackbar
        anchorOrigin={{ vertical: "buttom", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="success">{message}</Alert>
      </Snackbar>
    </div>
  );
}
