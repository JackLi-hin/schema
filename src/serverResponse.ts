import {z} from 'zod';
export const responseType = z.union([z.literal('error'),z.literal('success')])
export const responseMessageSchema=z.object({
    responseType:z.string(),
    message:z.string(),
    responseData:z.any().optional()
})
export type responseMessage = z.infer<typeof responseMessageSchema>