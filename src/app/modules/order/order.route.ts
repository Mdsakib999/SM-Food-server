import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidations } from "./order.validation";
import { orderControllers } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../users/user.constant";




const router = Router()


router.post('/', validateRequest(orderValidations.orderValidationSchema), orderControllers.createOrder)
router.get('/', orderControllers.getAllOrder)
router.delete('/:id', orderControllers.deleteOrder)
router.patch('/update-status/:id', orderControllers.updateOrderStatus)
router.get('/get-user-order', auth(USER_ROLE.customer), orderControllers.getOrderForUser)

export const orderRouters = router



