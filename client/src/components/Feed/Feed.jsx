import React, { useEffect, useState } from "react";
import "./Feed.scss";
import axios from "axios";
import { format } from "date-fns";
import cloud from "../../assets/clouds.png";
import prettyBytes from "pretty-bytes";
import toast, { Toaster } from "react-hot-toast";

import { IconButton } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ReorderIcon from "@mui/icons-material/Reorder";

import baseUrl from "../utils/baseUrl";
import uploadFile from "../utils/uploadFile";
import InputFileUpload from "../utils/InputFileUpload";
import RefreshIcon from "@mui/icons-material/Refresh";

import ImageIcon from "@mui/icons-material/Image";
import VideoFileIcon from "@mui/icons-material/VideoFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import LanguageIcon from "@mui/icons-material/Language";
import HtmlIcon from "@mui/icons-material/Html";
import BasicSelect from "./BasicSelect";

const Feed = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState("");
  const [fileEmpty, setFileEmpty] = useState("");
  const [files, setFiles] = useState([]);

  const handleFileUpload = async (e) => {
    setLoading(true);
    try {
      const res = await uploadFile(e, user);
      if (res) {
        setFiles((files) => [res.data, ...files]);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadFiles();
    }
  }, [user]);

  const loadFiles = async () => {
    toast.dismiss();
    const res = axios.get(`${baseUrl}/upload/${user.userId}`);
    toast.promise(res, {
      loading: <b> Loading </b>,
      success: (files) => {
        setLoadingFiles(false);
        setFiles(files.data);
      },
      error: <b> File loading failed, Reload </b>,
    });
  };

  const handleReloadFiles = () => {
    setLoadingFiles(true);
    loadFiles();
  };

  const handleDeleteFile = (fileId) => {
    const deleteRes = axios.delete(`${baseUrl}/upload`, {
      data: { userId: user.userId, fileId },
    });
    toast.promise(deleteRes, {
      loading: <b> Loading </b>,
      success: () => {
        setFiles((files) => files.filter((file) => file._id !== fileId));
      },
      error: <b> file not deleted </b>,
    });
  };

  const handleRenameFile = (fileId) => {
    console.log(fileId);
  };

  return (
    <div className='feed'>
      <div className='navbar'>
        <div className='logo'>
          <img src={cloud} loading='lazy' alt='icon' />
        </div>

        <div className='email'>
          <h6> {user?.email} </h6>
        </div>
      </div>

      <div className='feed__main'>
        <div>
          <Toaster position='top-center' />
        </div>
        <div className='error'>
          <div>{error ? error : ""}</div>
        </div>

        <div className='top mb-4'>
          <div className='header'>
            <InputFileUpload handleFileUpload={handleFileUpload} />
          </div>

          <div>
            <IconButton
              aria-label='refresh'
              color='default'
              onClick={handleReloadFiles}
            >
              <RefreshIcon />
            </IconButton>
          </div>

          <div className='viewType'>
            <IconButton aria-label='listLayout'>
              <ReorderIcon fontSize='small' />
            </IconButton>

            <IconButton aria-label='gridLayout'>
              <GridViewIcon fontSize='small' />
            </IconButton>
          </div>
        </div>

        <div className='main'>
          {files.length > 0 &&
            files.map((file, index) => (
              <div
                className={"file"}
                key={index}
                style={{ display: loadingFiles && "none" }}
              >
                <div className='file__name'>
                  {file.type === "image/png" && <ImageIcon color='error' />}
                  {file.type === "image/jpeg" && <ImageIcon color='error' />}
                  {file.type === "image/webp" && <LanguageIcon color='error' />}
                  {file.type === "video/mp4" && <VideoFileIcon color='error' />}
                  {file.type === "application/pdf" && (
                    <PictureAsPdfIcon color='error' />
                  )}
                  {file.type === "application/hta" && (
                    <HtmlIcon color='error' />
                  )}
                  <input
                    type='text'
                    value={file.name}
                    style={{
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      fontWeight: "bold",
                    }}
                  />
                </div>

                <div className='file__type'>{file?.type}</div>

                <div className='file__size'>{prettyBytes(file?.size)}</div>

                <div className='file__timestamp'>
                  Upload at {format(new Date(file?.createdAt), "MMM yy")}
                </div>

                <div
                  className='file__more'
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
            ))}

          {fileEmpty && (
            <div className='file'>
              <h5> {fileEmpty} </h5>
            </div>
          )}

          {loadingFiles && (
            <div className='file'>
              <h6> loading...! </h6>
            </div>
          )}
        </div>

        <div className='fileUploadingSnackbar '>
          {loading ? (
            <div className='snackbar'>
              <h6>1 file is uploading...</h6>
              <h6> loading...</h6>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
