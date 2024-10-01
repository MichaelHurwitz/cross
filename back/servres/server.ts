import { v4 as uuidv4 } from "uuid";
import {
  readFromJsonFile,
  writeUserToJsonFile,
  editUserToJsonFile,
} from "../DAL/jsonUsers.js";
import bcrypt from "bcrypt";
import { promises } from "dns";
import axios from "axios";
import jsonfile from "jsonfile";
import { json } from "stream/consumers";
import { error, log } from "console";
import jwt from "jsonwebtoken";
import { User } from "../models/types.js";

export const registerUser = async (

    // firstName:string,
    // lastName:string,
    // image:string,
    userName: string,
    password: string
  ): Promise<string> => {
    const users: User[] = await readFromJsonFile();
    const existingUser = users.find((u) => u.userName === userName);
  
    if (existingUser) {
      throw new Error("Username already exists.");
    }
  
    const hashedPassword = bcrypt.hashSync(password, 10);
  
    const newUserId: string = uuidv4();
  
    const newUser: User = {
      id: newUserId,
      // firstName,
      // lastName,
      userName,
      // image,
      password: hashedPassword,
      games: [],
    }; 
    await writeUserToJsonFile(newUser);
    
    return newUserId;
  };
  
  export const authenticateUser = async (
    userName: string,
    password: string
  ): Promise<any> => {
    const users: User[] = await readFromJsonFile();
    const userFind = users.find((u) => u.userName === userName);
  
    if (!userFind) {
      throw new Error("Invalid username or password.");
    }
  
    const passwordMatch = bcrypt.compareSync(password, userFind.password);
  
    if (!passwordMatch) {
      throw new Error("Invalid username or password.");
    }
    return userFind.id;
  ;
  
    
  };