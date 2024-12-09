import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { orderValidations } from "./order.validation";
import { orderControllers } from "./order.controller";




const router = Router()


router.post('/', validateRequest(orderValidations.orderValidationSchema), orderControllers.createOrder)
router.get('/', orderControllers.getAllOrder)
router.patch('/update-status/:id', orderControllers.updateOrderStatus)

export const orderRouters = router



