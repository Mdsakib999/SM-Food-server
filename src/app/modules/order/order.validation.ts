import { z } from "zod";


const orderValidationSchema = z.object({
    body: z.object({
        product: z.array(
            z.object({
                productId: z.string().nonempty("Product ID is required"),
                quantity: z.string().nonempty("Quantity is required"),
            })
        ),
        userId: z.string().optional(),
        totalAmount: z.string(),
        orderStatus: z.string().optional(),
        userLocation: z.object({
            location: z.string().nonempty("Location is required"),
            number: z.string().nonempty("Contact number is required"),
        }),
    })
})

export const orderValidations = {
    orderValidationSchema
}