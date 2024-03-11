import React, { useRef, useState } from "react";
import "./Files.scss";
import prettyBytes from "pretty-bytes";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LanguageIcon from "@mui/icons-material/Language";
import HtmlIcon from "@mui/icons-material/Html";
import BasicSelect from "./BasicSelect";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ClearIcon from "@mui/icons-material/Clear";

const Files = ({
  file,
  loadingFiles,
  handleDeleteFile,
  handleSumbitRename,
}) => {
  const [fileName, setFileName] = useState(file.name);
  const [startFocus, setStartFocus] = useState(false);
  const inputRef = useRef(null);

  const handleRenameFile = () => {
    setStartFocus(true);
    inputRef.current.focus();
  };

  return (
    <div className="file p-0" style={{ display: loadingFiles && "none" }}>
      <div className="file__name">
        {file.type === "image/png" && <ImageIcon color="error" />}
        {file.type === "image/jpeg" && <ImageIcon color="error" />}
        {file.type === "image/webp" && <LanguageIcon color="error" />}
        {file.type === "video/mp4" && <VideoFileIcon color="error" />}
        {file.type === "application/pdf" && <PictureAsPdfIcon color="error" />}
        {file.type === "application/hta" && <HtmlIcon color="error" />}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const value = e.target["rename"].value;
            handleSumbitRename({
              value,
              fileId: file._id,
            });
          }}
          onMouseLeave={() => setStartFocus(false)}
        >
          <input
            style={{ borderBottom: !startFocus && "1px solid transparent" }}
            ref={inputRef}
            className="fileName"
            type="text"
            value={fileName}
            readOnly={!startFocus}
            onChange={(e) => setFileName(e.target.value)}
            name="rename"
            required
            pattern="[^ ].*"
          />
          {startFocus && (
            <>
              <IconButton
                type="submit"
                size="small"
                title="submit or press enter"
              >
                <SaveAltIcon fontSize="inherit" />
              </IconButton>

              <IconButton
                onClick={() => setStartFocus(false)}
                aria-label="delete"
                size="small"
                title="Cancel"
              >
                <ClearIcon fontSize="inherit" />
              </IconButton>
            </>
          )}
        </form>
      </div>

      <div className="file__type">{file?.type}</div>

      <div className="file__size">{prettyBytes(file?.size)}</div>

      <div className="file__timestamp">
        {formatDistanceToNow(new Date(file?.createdAt))} ago
      </div>

      <div
        className="file__more"
        style={{
          position: "relative",
        }}
      >
        <BasicSelect
          fileId={file._id}
          handleDeleteFile={handleDeleteFile}
          handleRenameFile={handleRenameFile}
        />
      </div>
    </div>
  );
};

export default Files;
