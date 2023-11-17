import { prisma } from "../database/prisma.config";

export async function authVerifyEmail (_email: string) {
    const students = await prisma.student.findMany({
         where: {
            email:_email
         }
    })

    return students
}