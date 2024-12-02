import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
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
const deleteProductFromDB = async (id: string) => {
    console.log(id);
    const isProductExist = await Product.findById(id)
    if (!isProductExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product is Not Exist')
    }
    const result = await Product.deleteOne({ _id: id })
    return result
}

export const productServices = {
    createProductIntoDB,
    getAllProductFromDB,
    deleteProductFromDB
} 