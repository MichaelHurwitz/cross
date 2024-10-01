import express,{Router} from "express";
// import { Router } from "express-serve-static-core";

const router:Router = express.Router();

router.route("/auth/register").post();
router.route("/auth/login").post();
router.route("/games").get();
router.route("games/start").post();
router.route("/games/move/:id")


export default router;