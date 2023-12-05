import { prisma } from "../database/prisma.config";
import bcrypt from "bcrypt"

export async function authVerifyPassword(_password: string, _email: string, table: string) {

    if (table === "student") {

        const passwordRepositorie = await prisma.student.findUnique({
            where: {
                email: _email
            }
        })

        const pass = passwordRepositorie?.password as string;

        const verifyPass = await bcrypt.compare(_password, pass)

        return verifyPass;
    }


    if (table === "teachers") {
        const passwordRepositorie = await prisma.teacher.findUnique({
            where: {
                email: _email
            }
        })

        const pass = passwordRepositorie?.password as string;

        const verifyPass = await bcrypt.compare(_password, pass)

        return verifyPass;
    }
}