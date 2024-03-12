import React, { useEffect, useRef, useState } from "react";
import "./Preview.scss";
import axios from "axios";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import baseUrl from "../utils/baseUrl";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ReplyIcon from "@mui/icons-material/Reply";

const Preview = () => {
  const { state: fileId } = useLocation();
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/file/${fileId}`)
      .then((res) => {
        setFile(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleVolume = () => {
    if (videoRef.current) videoRef.current.volume = 0.2;
  };
  return (
    <div className="preview">
      <div className="preview__main">
        <div className="preview__file">
          {!file.type && <CircularProgress />}
          {file.type === "image/jpeg" && <img src={file.cFile} alt="file" />}
          {file.type === "image/png" && <img src={file.cFile} alt="file" />}
          {file.type === "image/webp" && <img src={file.cFile} alt="file" />}

          {file.type === "image/webp" && <img src={file.cFile} alt="file" />}

          {file.type === "video/mp4" && (
            <video
              style={{ width: "100%", height: "100%" }}
              src={file.cFile}
              ref={videoRef}
              onLoadedMetadata={handleVolume}
              controls
              loop
            >
              Your browser does not support the video tag
            </video>
          )}

          {file.type === "application/pdf" && (
            <iframe
              style={{ width: "100vw", height: "90vh" }}
              src={file.cFile}
            ></iframe>
          )}
        </div>
      </div>

      <div className="preview__action">
        <Button
          variant="outlined"
          size="small"
          title="Download"
          href={file.cFile}
          download={file.name}
        >
          <FileDownloadIcon />
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate(-1)}
          endIcon={<ReplyIcon />}
          title="Back"
        ></Button>
      </div>
    </div>
  );
};

export default Preview;
