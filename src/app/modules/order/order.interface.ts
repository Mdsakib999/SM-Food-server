import { Types } from "mongoose";

export type TOrder = {
    product: {
        productId: Types.ObjectId;
        quantity: string;
    }[];
    totalAmount: string
    userId?: Types.ObjectId;
    orderStatus: 'pending' | 'shipped' | 'delivered',
    userLocation: {
        isInChittagong: boolean
        location: string;
        number: string;
    };
};
