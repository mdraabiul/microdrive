import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    axios
      .get(`${baseUrl}/file/${fileId}`)
      .then((res) => {
        setFile(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="preview">
      <div className="preview__main">
        <div className="preview__file">
          {file ? <img src={file.cFile} alt="file" /> : <CircularProgress />}
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
