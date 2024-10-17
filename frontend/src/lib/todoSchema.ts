import { z } from "zod";

 const todoSchema=z.object({
    name:z.string().trim().min(2,"name must be contain 2 latters"),
    starting:z.string(),
    ending:z.string().optional(),
})


export type TtodoSchema=z.infer<typeof todoSchema>
export default todoSchema