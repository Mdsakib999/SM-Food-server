import { z } from "zod"

const productValidationSchema = z.object({
    body: z.object({
        productName: z.string().min(1, "Product name is required"), // Matches the `productName` field
        images: z.array(z.string()).min(1, "At least one image is required"), // Matches the `images` field
        quantity: z.string().regex(/^\d+$/, "Quantity must be a numeric string"), // Matches the `quantity` field
        status: z.enum(["active", "inactive"]).optional(), // Matches the `status` field with enum
        rating: z.object({
            totalPeople: z
                .string()
                .regex(/^\d+$/, "Total people must be a numeric string") // Matches `rating.totalPeople`
                .optional(), // Optional as no `required` in schema
            totalRating: z
                .string()
                .regex(
                    /^\d+(\.\d+)?$/,
                    "Total rating must be a numeric string or decimal"
                ) // Matches `rating.totalRating`
                .optional(), // Optional as no `required` in schema
        }).optional(),
        productPrice: z.string(),
        discount: z.string(),
        description: z.string().min(1, "Description is required"), // Matches `description`
        category: z.string().min(1, "Category is required"), // Matches `category`
        productUnit: z.string().min(1, "Product unit is required"), // Matches `productUnit`
    }),
});


export const productValidations = {
    productValidationSchema
}