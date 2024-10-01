import express,{Router} from "express";
// import { Router } from "express-serve-static-core";
import {createToken} from "../middleWere/midddeleWere.js"
import {login,register}  from "../controller/controller.js"


const router:Router = express.Router();

router.route("/auth/register").post(register);
router.route("/auth/login").post(createToken,login);
router.route("/games").get();
router.route("games/start").post();
router.route("/games/move/:id")


export default router;