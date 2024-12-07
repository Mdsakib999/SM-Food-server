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
    console.log({ email });
    const isExist = await Users.findOne({ email: email })
    let token
    if (isExist) {
        const t = jwt.sign({ email: isExist.email, role: isExist.role }, config.privateKey as string, { expiresIn: '1d' })
        token = t
    }
    else {
        const result = await Users.create({ email })
        if (result) {
            const isExist = await Users.findOne({ email: email })
            if (isExist) {
                const t = jwt.sign({ email: isExist.email, role: isExist.role }, config.privateKey as string, { expiresIn: '1d' })
                token = t
            }
        }
    }


    return { token }
}
const updateUserFromDB = async (payload: { role: string }, id: string) => {
    const result = await Users.findByIdAndUpdate(id, { $set: { role: payload.role } })
    return result
}


export const userServices = {
    createUsersIntoDB,
    getAllUsersFromDB,
    findUserGiveToken,
    updateUserFromDB
}

