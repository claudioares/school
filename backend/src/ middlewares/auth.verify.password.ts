import { prisma } from "../database/prisma.config";
import bcrypt from "bcrypt"

export async function authVerifyPassword (_password:string, _email: string) {

    const passwordRepositorie = await prisma.student.findUnique({
        where:{
            email:_email
        }
    })

    const pass = passwordRepositorie?.password as string;
    
    const verifyPass = await bcrypt.compare(_password, pass)


    return verifyPass;
}