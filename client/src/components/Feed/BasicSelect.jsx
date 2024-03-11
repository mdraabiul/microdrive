import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { Button, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

export default function BasicSelect({
  fileId,
  handleDeleteFile,
  handleRenameFile,
}) {
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  const handlePreview = () => {
    navigate("/preview", { state: fileId });
  };

  return (
    <div style={{ position: "relative" }}>
      <div>
        <IconButton
          onClick={() => setShowOptions((prev) => !prev)}
          aria-label="more"
          size="small"
        >
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
      </div>
      {showOptions && (
        <div
          style={{
            position: "absolute",
            right: "0px",
            top: "0px",
            zIndex: "100",
            background: "white",
            width: "100%",
            borderRadius: "10px",
          }}
        >
          <MenuItem
            style={{
              justifyContent: "center",
            }}
            onClick={() => {
              handleRenameFile(fileId);
              setShowOptions((prev) => !prev);
            }}
          >
            Rename
          </MenuItem>

          <MenuItem
            style={{
              justifyContent: "center",
            }}
            onClick={handlePreview}
          >
            Preview
          </MenuItem>
          <MenuItem
            style={{
              justifyContent: "center",
            }}
            onClick={() => {
              handleDeleteFile(fileId);
              setShowOptions((prev) => !prev);
            }}
          >
            Delete
          </MenuItem>
          <MenuItem
            style={{
              justifyContent: "center",
            }}
            onClick={() => setShowOptions((prev) => !prev)}
          >
            Cancel
          </MenuItem>
        </div>
      )}
    </div>
  );
}
