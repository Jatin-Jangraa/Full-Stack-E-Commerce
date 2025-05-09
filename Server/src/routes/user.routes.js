import express from "express";

import {
  alluser,
  deleteuser,
  signinuser,
  signupuser,
  userbyid,
} from "../controllers/user.controller.js";
import middle from "../middlewares/auth.middlewares.js";

export const userroutes = express.Router();

// http://localhost:4000/user/            base url

userroutes.post("/signup", signupuser);

userroutes.post("/signin", signinuser);

userroutes.get("/all",  alluser);

userroutes.get("/:id",  userbyid);

userroutes.delete("/delete/:id",  deleteuser);


