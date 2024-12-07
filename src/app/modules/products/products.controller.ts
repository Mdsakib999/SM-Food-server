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
    const query = req.query
    const result = await productServices.getAllProductFromDB(query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product Get All succesfully',
        data: result
    })
})
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await productServices.getSingleProductFromDB(id)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get Single Product succesfully',
        data: result
    })
})
const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const result = await productServices.updateProductFromDB(id, data)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Product Update succesfully',
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
    deleteProduct,
    updateProduct,
    getSingleProduct
}