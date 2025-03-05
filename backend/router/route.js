import { Router } from "express";
const router = Router();
import * as controller from "../controller/appController.js";

router.route("/signin").post(
    controller.signin
)

router.route("/login").post(
    controller.verifyUser, controller.login
)

export default router;
