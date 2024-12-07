import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { deleteImageUrls } from "../../utils/deleteimageUrl";
import { productSearchField } from "./products.constant";
import { TProduct } from "./products.interface";
import { Product } from "./products.model";
import httpStatus from 'http-status';



const createProductIntoDB = async (payload: TProduct) => {
    const isProductExist = await Product.findOne({ productName: payload.productName })
    if (isProductExist) {
        throw new AppError(httpStatus.CONFLICT, 'Product Already exist')
    }
    const result = await Product.create(payload)
    return result
}
const getAllProductFromDB = async (query: Record<string, unknown>) => {
    const productQuery = new QueryBuilder(Product.find(), query).search(productSearchField).filter().sort().paginate().fields()
    const meta = await productQuery.countTotal()
    const result = await productQuery.modelQuery
    return {
        meta,
        result
    }
}
const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id)
    if (!result) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product is Not Exist')
    }
    return result
}
const updateProductFromDB = async (id: string, payload: TProduct) => {
    const isProductExist = await Product.findById(id)
    if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, "Product doesn't Exist")
    }
    const result = await Product.findByIdAndUpdate(id, { $set: { ...payload } })
    return result

}
const deleteProductFromDB = async (id: string) => {
    console.log(id);
    const isProductExist = await Product.findById(id)
    if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product is Not Exist')
    }
    if (isProductExist.images.length > 0) {
        const res = await deleteImageUrls(isProductExist.images)
        console.log(res);
    }
    const result = await Product.deleteOne({ _id: id })
    return result
}

export const productServices = {
    createProductIntoDB,
    getAllProductFromDB,
    deleteProductFromDB,
    updateProductFromDB,
    getSingleProductFromDB
} 