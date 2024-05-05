import { z } from 'zod'

export const SignUpSchema=z.object({
        firstName:z.string(),
        lastName:z.string(),
        email:z.string().email(),
        password:z.string().min(6),
        age:z.int(),
        address:z.string()



})