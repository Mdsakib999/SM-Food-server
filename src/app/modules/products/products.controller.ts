import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { productServices } from "./products.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from 'http-status';



const createProduct = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await productServices.createProductIntoDB(data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product create succesfully',
        data: result
    })
})
const getAllProduct = catchAsync(async (req: Request, res: Response) => {
    const data = req.body
    const result = await productServices.getAllProductFromDB(data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product Get All succesfully',
        data: result
    })
})
const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await productServices.deleteProductFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product Delete succesfully',
        data: result
    })
})


export const productControllers = {
    createProduct,
    getAllProduct,
    deleteProduct
}