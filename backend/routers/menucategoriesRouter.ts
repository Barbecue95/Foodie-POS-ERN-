import express from "express";

const menuCategoryRouter = express.Router();

menuCategoryRouter.get("/", (req,res) => { res.end("Get")});

menuCategoryRouter.post("/", (req,res) => { res.end("Post")});

menuCategoryRouter.put("/", (req,res) => { res.end("Put")});

menuCategoryRouter.delete("/", (req,res) => { res.end("Delete")});

export default menuCategoryRouter;