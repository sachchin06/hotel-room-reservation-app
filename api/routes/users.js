import express from "express";
import {updateUser, deleteUser, getUser, getAllUsers } from "../controllers/user.js"
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

export default router;

// router.get("/checkToken", verifyToken, (req,res,next)=>{
//     res.send("hello, your are loged in")
// })

// router.get("/checkUser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user, your are loged in and allowed to operations")
// })

// router.get("/checkAdmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello Admin, your are loged in and allowed to operations")
// })

//UPDATE
router.put("/:id",verifyUser, updateUser)
//DELETE

router.delete("/:id",verifyUser, deleteUser)
//GET

router.get("/:id",verifyUser, getUser)

//GET ALL
router.get("/",verifyAdmin, getAllUsers)