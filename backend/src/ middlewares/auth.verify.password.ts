import { prisma } from "../database/prisma.config";

export async function authVerifyPassword (_password: string ) {
    const passwordExist = await prisma.student.findMany({
        where: {
            password: _password
        }
    })


    return passwordExist;
}