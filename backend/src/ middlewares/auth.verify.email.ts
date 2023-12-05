import { prisma } from "../database/prisma.config";

export async function authVerifyEmail (_email: string, table:string) {
 
  if(table === "student"){
    const students = await prisma.student.findMany({
        where: {
           email:_email
        }
    })


    return students
  }

  if(table === "teacher"){
    const students = await prisma.teacher.findMany({
        where: {
           email:_email
        }
    })

    return students
  } 
}