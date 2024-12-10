import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { Users } from "../users/users.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";
import httpStatus from 'http-status';




const createOrderIntoDB = async (payload: TOrder) => {
    const result = await Order.create(payload)
    return result
}
const getAllOrderFromDB = async (query: Record<string, unknown>) => {
    const orderQuery = new QueryBuilder(Order.find().populate({ path: 'product.productId', select: 'productName productPrice images productUnit quantity' }).populate('userId'), query).search(["_id"]).filter().sort().paginate().fields()
    const meta = await orderQuery.countTotal()
    const result = await orderQuery.modelQuery
    return {
        meta,
        result
    }

}
const updateOrderStatusFromDB = async (id: string, payload: { status: string }) => {
    const result = await Order.findByIdAndUpdate(id, { $set: { orderStatus: payload.status } })
    return result
}
const deleteOrderFromDB = async (id: string) => {
    const result = await Order.findByIdAndDelete(id)
    return result
}
const getOrderForUserFromDB = async (email: string, query: Record<string, unknown>) => {
    const isUserExist = await Users.findOne({ email })
    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "user Not found")
    }
    const orderQuery = new QueryBuilder(Order.find({ userId: isUserExist?._id }).populate({ path: 'product.productId', select: 'productName productPrice images productUnit ' }).select('-userId -userLocation'), query).search([]).filter().sort().paginate().fields()
    const meta = await orderQuery.countTotal()
    const result = await orderQuery.modelQuery
    return {
        meta,
        result
    }
}

export const orderServices = {
    createOrderIntoDB,
    getAllOrderFromDB,
    updateOrderStatusFromDB,
    deleteOrderFromDB,
    getOrderForUserFromDB
}