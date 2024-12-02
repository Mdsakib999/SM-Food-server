import QueryBuilder from "../../builder/QueryBuilder";
import config from "../../config";
import AppError from "../../errors/AppError";
import { TUsers } from "./users.interface";
import { Users } from "./users.model";
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';




const createUsersIntoDB = async (payload: TUsers) => {
    const isExist = await Users.findOne({ email: payload.email })
    if (isExist) {
        throw new AppError(httpStatus.CONFLICT, "User Is already Exist")
    }
    const result = await Users.create(payload)
    return result
}

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
    const userQuery = new QueryBuilder(Users.find(), query).search(["email"]).filter().sort().paginate().fields()
    const meta = await userQuery.countTotal()
    const result = await userQuery.modelQuery
    return {
        meta,
        result
    }
}
const findUserGiveToken = async (email: string) => {
    const isExist = await Users.findOne({ email })
    if (!isExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User is not Exist")
    }
    const token = jwt.sign({ email: isExist.email, role: isExist.role }, config.privateKey as string, { expiresIn: '1d' })
    return { token }
}


export const userServices = {
    createUsersIntoDB,
    getAllUsersFromDB,
    findUserGiveToken
}

