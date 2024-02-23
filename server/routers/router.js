import express from "express";
import Home from "../controllers/Home/Home.js";
import signup from "../controllers/signup/signup.js";
import upload from "../controllers/upload/upload.js";
import login from "../controllers/login/login.js";
import multer from "multer";

const router = express.Router();

router.get("/", Home);

router.post("/signup", signup);
router.post("/login", login);
router.post("/upload", upload);

export default router;
