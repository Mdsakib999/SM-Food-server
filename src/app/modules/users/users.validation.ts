import { z } from "zod";



const userValidationSchema = z.object({
    body: z.object({
        email: z.string().min(1, "Email is Required"),
    })
})
const jwtValidationSchema = z.object({
    body: z.object({
        email: z.string().min(1, "Email is Required"),
    })
})

export const userValidations = {
    userValidationSchema,
    jwtValidationSchema
}