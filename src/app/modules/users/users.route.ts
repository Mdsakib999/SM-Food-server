import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { userValidations } from "./users.validation";
import { userControllers } from "./users.controller";



const router = Router()


router.post('/create-user', validateRequest(userValidations.userValidationSchema), userControllers.createUsers)
router.get('/', userControllers.getAllUsers)
router.get('/getMe/:email', userControllers.getMe)
router.post('/get-token', validateRequest(userValidations.jwtValidationSchema), userControllers.findUserGiveToken)
router.patch('/:id', userControllers.updateUser)


export const userRouters = router 