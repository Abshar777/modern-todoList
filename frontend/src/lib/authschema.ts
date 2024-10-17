import {z} from "zod"

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string()
})

export const signUpSchema=z.object({
    firstName:z.string().min(2,"first name must be contain 2 latters"),
    lastName:z.string().min(2,"last name must be contain 2 latters"),
    displayName:z.string(),
    photoURL:z.string(),
    email:z.string().email(),
    password:z.string().min(8,'Password must be at least 8 characters long')

})


export type loginSchemaType=z.infer<typeof loginSchema>
export type signUpSchemaType=z.infer<typeof signUpSchema>