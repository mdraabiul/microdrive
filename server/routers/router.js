import express from "express";
import multer from "multer";
import Home from "../controllers/Home/Home.js";
import signup from "../controllers/signup/signup.js";
import login from "../controllers/login/login.js";
import upload from "../controllers/upload/upload.js";
import showFiles from "../controllers/upload/showFiles.js";
import deleteFile from "../controllers/upload/deleteFile.js";
import updateFileName from "../controllers/upload/updateFileName.js";
import getFile from "../controllers/Home/file/getFile.js";

const router = express.Router();

router.get("/", Home);

router.post("/signup", signup);
router.post("/login", login);

router.get("/upload/:userId", showFiles);
router.post("/upload", upload);
router.delete("/upload", deleteFile);
router.put("/upload", updateFileName);

router.get('/file/:fileId', getFile)

export default router;
