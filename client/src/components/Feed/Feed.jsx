import React, { useEffect, useState } from "react";
import "./Feed.scss";
import axios from "axios";
import cloud from "../../assets/clouds.png";
import toast, { Toaster } from "react-hot-toast";

import baseUrl from "../utils/baseUrl";
import InputFileUpload from "../utils/InputFileUpload";
import Files from "./Files";
import convertToBase64 from "../utils/convertToBase64";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Feed = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const loadFiles = axios.get(`${baseUrl}/upload/${user.userId}`, {
        params: {
          page,
          limit,
        },
      });
      toast.promise(loadFiles, {
        loading: () => setLoadingFiles(true),
        success: (res) => {
          setFiles(res.data);
          setLoadingFiles(false);
        },
        error: (err) => setError(err.message),
      });
    }
  }, [user, page, limit]);

  useEffect(() => {
    if (error) {
      setInterval(() => {
        setError("");
      }, 2000);
    }
  }, [error]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    convertToBase64(e.target.files[0])
      .then((cFile) => {
        const uploadFile = axios.post(`${baseUrl}/upload`, {
          cFile,
          name: file.name,
          type: file.type,
          size: file.size,
          userId: user.userId,
        });
        toast.promise(uploadFile, {
          loading: () => setLoading(true),
          success: (res) => {
            setLoading(false);
            setFiles((files) => [res.data, ...files]);
          },
          error: () => {
            setLoading(false);
            setError("File with the same name already exist");
          },
        });
      })

      .catch((err) => setError(err.message));
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

  const handleSumbitRename = ({ value, fileId }) => {
    const renameRes = axios.put(`${baseUrl}/upload`, {
      data: { value, fileId },
    });

    toast.promise(renameRes, {
      loading: <b> Loading </b>,
      success: <b>File rename successfully</b>,
      error: <b> file not deleted </b>,
    });
  };

  const loadMoreFiles = () => {
    setPage(page + 1);
  };

  return (
    <div className="feed">
      <div className="navbar">
        <div className="logo">
          <img src={cloud} loading="lazy" alt="icon" />
        </div>
        <div className="email">{user?.email}</div>
      </div>

      <div className="feed__main">
        <div>
          <Toaster position="top-center" />
        </div>
        <div className="error">
          <p>{error ? error : ""}</p>
        </div>

        <div className="top mb-4">
          <div className="header">
            <InputFileUpload handleFileUpload={handleFileUpload} />
          </div>
        </div>
        <div className="main">
          {files &&
            files.length > 0 &&
            files.map((file) => (
              <Files
                key={file._id}
                file={file}
                loadingFiles={loadingFiles}
                handleDeleteFile={handleDeleteFile}
                handleSumbitRename={handleSumbitRename}
              />
            ))}

          {files.length > 0 ? (
            <Button
              variant="text"
              size="small"
              color="success"
              className="mt-4 text-capitalize"
              onClick={loadMoreFiles}
            >
              More
            </Button>
          ) : (
            <>
              <Button
                variant="text"
                size="small"
                color="success"
                className="mt-4 text-capitalize"
                disabled
              >
                no more
              </Button>
              <Button
                variant="text"
                size="small"
                color="success"
                className="mt-4 text-capitalize"
                onClick={() => navigate(-1)}
              >
                Back
              </Button>
            </>
          )}

          {loadingFiles && (
            <div className="file">
              <h6 style={{ fontWeight: "bold" }}> loading...! </h6>
            </div>
          )}
        </div>

        <div className="fileUploadingSnackbar ">
          {loading ? (
            <div className="snackbar">
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
