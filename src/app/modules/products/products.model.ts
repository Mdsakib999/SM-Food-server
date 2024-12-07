import { model, Schema } from "mongoose";
import { TProduct } from "./products.interface";



const productSchema = new Schema<TProduct>({
    productName: { type: String, required: true },
    images: { type: [String], required: true, default: [] },
    quantity: { type: String, required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    rating: {
        totalPeople: { type: String, default: '0' },
        totalRating: { type: String, default: '0' },
    },
    productPrice: { type: String, required: true },
    discount: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    productUnit: { type: String, required: true }
})

export const Product = model<TProduct>('Product', productSchema)