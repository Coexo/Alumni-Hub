import { Router } from "express";
const router = Router();
import * as controller from "../controller/appController.js";

router.route("/signin").post(
    controller.signin
)

router.route("/login").post(
    controller.verifyUser, controller.login
)

router.route("/education-details").put(
    controller.verifyToken, controller.updateEducation
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

router.route("/get-jobs-list").get(controller.jobsList);


router.route("/create-event").post(
    controller.verifyToken, controller.createEvent
)



router.route("/get-events").get(
    controller.getAllEvents
)

router.route("/profile/:id").get(
    controller.verifyToken, controller.getUserData
)

router.route("/user/:id").get(
    controller.verifyToken, controller.getEduData
)

export default router;
