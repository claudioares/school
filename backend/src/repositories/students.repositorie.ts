import { prisma } from "../database/prisma.config";
import { ICreateStudantType, IMethodsStudant, IStudants, IUpdateStudentId } from "../interfaces/students.interface";

export class StudentsRepositorie implements IMethodsStudant {
  
    async create({ student, email, password }: ICreateStudantType): Promise<IStudants> {
       
        const dataBase = await prisma.student.create({
            data:{
                student, email, password
            }
        });
    
        return dataBase;
    }

    async login(_email:string): Promise<IStudants | null> {
        const studentLogin = await prisma.student.findMany({
            where:{
                email:_email
            }
        })

        return studentLogin as unknown as IStudants;
    }

    async getStudentId(id: string): Promise<IStudants> {
        const studentId = await prisma.student.findUnique({
            where:{
                id
            }
        })

        return studentId as unknown as IStudants;
    }

    async updateStudentId(data:IUpdateStudentId): Promise<IStudants | string | boolean> {

        const studentId = await prisma.student.update({
            where:{
                email:data.email
            },
            data:{
                student:data.student,
                birth:data.birth,
                cpf:data.cpf, 
                endress:data.endress, 
                nameFather:data.nameFather, 
                nameMother:data.nameMother, 
                password:data.password,
                highSchool:data.highSchool,
            }
        })

        

        return studentId as unknown as IStudants;
    }
}