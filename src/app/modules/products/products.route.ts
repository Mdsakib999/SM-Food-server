import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { productValidations } from "./products.validation";
import { productControllers } from "./products.controller";



const router = Router()


router.post('/create-product', validateRequest(productValidations.productValidationSchema), productControllers.createProduct)
router.get('/', productControllers.getAllProduct)
router.delete('/:id', productControllers.deleteProduct)

export const productRouter = router