"use client";

import PropertyForm from "../PropertyForm";
import { Modal, Box } from "@mui/material";

const AddPropertyModal = ({ open, onClose, onOptimisticAdd }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-property-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "900px",
          maxHeight: "90vh",
          overflowY: "auto",
          m: 2,
          "&:focus": {
            outline: "none",
          },
          // Custom scrollbar styling
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
            "&:hover": {
              background: "#555",
            },
          },
        }}
      >
        <PropertyForm onClose={onClose} onOptimisticAdd={onOptimisticAdd} />
      </Box>
    </Modal>
  );
};

export default AddPropertyModal;
