import { model, Schema } from "mongoose";
import { TUsers } from "./users.interface";



const categorySchema = new Schema<TUsers>({
    email: { type: String, required: true },
    role: { type: String, default: 'customer' },
}, { timestamps: true })

export const Users = model<TUsers>('Users', categorySchema)