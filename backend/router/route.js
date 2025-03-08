import { Router } from "express";
const router = Router();
import * as controller from "../controller/appController.js";

router.route("/signin").post(
    controller.signin
)

router.route("/login").post(
    controller.verifyUser, controller.login
)

router.route("/education-details").patch(
    controller.updateEducation
)

router.route("/project-details").patch(
    controller.updateProjects
)

router.route("/experience-details").patch(
    controller.updateExperience
)

router.route("/create").post(
    controller.verifyToken, controller.createJob
)

router.route("/deletejob/:id").post(
    controller.verifyToken, controller.deleteJob
)

router.route("/create-event").post(
    controller.verifyToken, controller.createEvent
)



router.route("/get-events").get(
    controller.getAllEvents
)

router.route("/profile/:id").get(
    controller.verifyToken, controller.getUserData
)

export default router;
