import express from "express";
// import { getAllPosts } from "../controllers/Posts";
import { createPost, getAllPosts } from "../controllers/Posts.js";
const router=express.Router();

router.get("/",getAllPosts);
router.post("/",createPost)

export default router;