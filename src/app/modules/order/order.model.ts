import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";


const orderSchema = new Schema<TOrder>(
    {
        product: [
            {
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
                quantity: { type: String, required: true },
            },
        ],
        totalAmount: { type: String, required: true },
        orderStatus: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
        userId: { type: Schema.Types.ObjectId, ref: 'Users', required: false }, // Reference to User
        userLocation: {
            isInChittagong: { type: Boolean, required: true },
            location: { type: String, required: true },
            number: { type: String, required: true },
        },
    },
    { timestamps: true }
);


export const Order = model<TOrder>('Order', orderSchema)