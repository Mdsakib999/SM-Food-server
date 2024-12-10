import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import { orderServices } from "./order.service"
import sendResponse from "../../utils/sendResponse"
import httpStatus from 'http-status';



const createOrder = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await orderServices.createOrderIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Order create succesfully',
        data: result
    })
})
const getAllOrder = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await orderServices.getAllOrderFromDB(query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Order succesfully',
        data: result
    })
})
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const { id } = req.params
    const result = await orderServices.updateOrderStatusFromDB(id, data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Update Order succesfully',
        data: result
    })
})
const deleteOrder = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await orderServices.deleteOrderFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Delete Order succesfully',
        data: result
    })
})
const getOrderForUser = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const email = req.user.email
    const result = await orderServices.getOrderForUserFromDB(email, query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Delete Order succesfully',
        data: result
    })
})



export const orderControllers = {
    createOrder,
    getAllOrder,
    updateOrderStatus,
    deleteOrder,
    getOrderForUser
}