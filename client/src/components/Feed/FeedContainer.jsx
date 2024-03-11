// import React, { useEffect, useState } from "react";
// import Feed from "./Feed";
// import axios from "axios";
// import baseUrl from "../utils/baseUrl";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addFiles } from "../../features/files/filesSlice";

// const FeedContainer = ({ user }) => {
//   const dispatch = useDispatch();
//   const files = useSelector((state) => state.files.files);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`${baseUrl}/upload/${user.userId}`)
//         .then((res) => {
//           dispatch(addFiles(res.data));
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//   }, [user]);

//   return <div>{files && <Feed files={files} />}</div>;
// };

// export default FeedContainer;
