import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { userServices } from "./users.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';




const createUsers = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await userServices.createUsersIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Create Users succesfully',
        data: result
    })
})
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const query = req.query
    const result = await userServices.getAllUsersFromDB(query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get All Users succesfully',
        data: result
    })
})
const findUserGiveToken = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.body
    const result = await userServices.findUserGiveToken(email)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get token succesfully',
        data: result
    })
})

export const userControllers = {
    createUsers,
    getAllUsers,
    findUserGiveToken
}