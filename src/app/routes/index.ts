import { Router } from "express";
import { productRouter } from "../modules/products/products.route";
import { userRouters } from "../modules/users/users.route";
import { orderRouters } from "../modules/order/order.route";


const router = Router()


const moduleRoutes = [
    {
        path: '/product',
        route: productRouter
    },
    {
        path: '/user',
        route: userRouters
    },
    {
        path: '/order',
        route: orderRouters
    }
]
moduleRoutes.map(item => router.use(item.path, item.route))

export default router