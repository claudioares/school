import { prisma } from "../database/prisma.config";

export async function authVerifyId (_id: string) {
    const studentId = await prisma.student.findUnique({
        where:{
            id:_id
        }
    })

    if(!studentId) return(false)
    return true;
}