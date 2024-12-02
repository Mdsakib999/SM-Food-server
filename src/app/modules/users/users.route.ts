import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./users.validation";
import { userControllers } from "./users.controller";



const router = Router()


router.post('/create-user', validateRequest(userValidations.userValidationSchema), userControllers.createUsers)
router.get('/', userControllers.getAllUsers)
router.get('/get-token', validateRequest(userValidations.jwtValidationSchema), userControllers.findUserGiveToken)


export const userRouters = router 