import { Request, Response } from "express";
import { authenticateToken } from "../middleWere/midddeleWere.js";
import { User } from "../models/types.js";
import {
    registerUser,
    authenticateUser,
  } from "../servres/server.js";


export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userName, password }:User = req.body;
  
      if (!userName || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
    
  
      const id = await registerUser(userName, password,);
      res.status(201).json({ id });
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };
  
  export const login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userName, password } = req.body;
  
      if (!userName || !password) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const userId = await authenticateUser(userName, password);
      res.status(200).json({ userid: userId });
    } catch (error: any) {
      // you can also check for unkown if it instance of Error.
      if (error.message === "Invalid username or password.") {
        res.status(401).json({ error: error.message });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };