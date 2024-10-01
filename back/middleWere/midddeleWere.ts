import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

const SECRET_KEY :string = process.env.SECRET_KEY || "your_secret_key_here"

export const createToken = async (req: Request, res: Response): Promise<Response> => {
  const id = req.body.id;

  if (!id) {
    return res.status(400).json({ error: "User ID is required to create a token." });
  }

  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "1h" });
  return res.status(200).json({ token });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction): Response | void => {
   const token = req.headers['authorization']?.split(" ")[1];

   if (!token) {
       return res.status(401).json({ error: "Access denied. Token is missing." });
   }

   jwt.verify(token, SECRET_KEY, (err, decoded) => {
       if (err) {
           return res.status(403).json({ error: "Invalid token." });
       }
       
       const userId = (decoded as any).id;
       req.body.id = userId;
       console.log("secseeecxfghj")

       next();
   });
};
