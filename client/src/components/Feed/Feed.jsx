import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../../features/user/userSlice";
import cloud from "../../assets/clouds.png";
import { IconButton, Button } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ReorderIcon from "@mui/icons-material/Reorder";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ImageIcon from "@mui/icons-material/Image";
import "./Feed.scss";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import convertToBase64 from "../utils/convertToBase64";

const Feed = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      dispatch(addUser(user));
    }
  }, []);

  const handleFileUpload = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const file = e.target.file.files[0];
      const cFile = await convertToBase64(e.target.file.files[0]);

      axios
        .post(`${baseUrl}/upload`, {
          cFile,
          name: file.name,
          type: file.type,
          size: file.size,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='feed'>
      <div className='navbar'>
        <div className='logo'>
          <img src={cloud} loading='lazy' alt='icon' />
        </div>

        <div className='email'>
          <h6> {user.email} </h6>
        </div>
      </div>

      <div className='feed__main'>
        <div className='top'>
          <div className='header'>
            <h2>Home</h2>
            <form
              className='fileUploadButton'
              encType='multipart/form-data'
              onSubmit={handleFileUpload}
            >
              <input type='file' name='file' id='file' />
              <button type='submit'>Upload</button>
            </form>
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

        <div className='middle border-bottom'>
          <div className='fileName'>
            <h6>FileName</h6>
          </div>
          <div className='about'>
            <h6>About</h6>
          </div>
        </div>

        <div className='main'>
          <div className='file'>
            <div className='file__name'>
              <ImageIcon />
              Daily income
            </div>
            <div className='file__timestamp'>feb 24 2024</div>
            <div className='file__more'>
              <IconButton aria-label='more' size='small'>
                <MoreVertIcon fontSize='inherit' />
              </IconButton>
            </div>
          </div>
        </div>

        <div className='fileUploadingSnackbar'>
          {loading ? (
            <div className='snackbar'>
              <h6>1 file is uploading...</h6>
              <h6> loading...</h6>
            </div>
          ) : (
            <div className='snackbar'>
              <h6>1 file is uploaded</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;
