import QueryBuilder from "../../builder/QueryBuilder";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";




const createOrderIntoDB = async (payload: TOrder) => {
    const result = await Order.create(payload)
    return result
}
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(Order.find().populate({ path: 'product.productId', select: 'productName productPrice images productUnit quantity' }).populate('userId'), query).search(["_id"]).filter().sort().paginate().fields()
    const meta = await productQuery.countTotal()
    const result = await productQuery.modelQuery
    return {
        meta,
        result
    }

}
const updateOrderStatusFromDB = async (id: string, payload: { status: string }) => {
    const result = await Order.findByIdAndUpdate(id, { $set: { orderStatus: payload.status } })
    return result
}

export const orderServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
    updateOrderStatusFromDB
}