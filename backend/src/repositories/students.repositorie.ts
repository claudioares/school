import { prisma } from "../database/prisma.config";
import { ICreateStudantType, ICreateStudant, IStudants, ILoginType } from "../interfaces/students.interface";

export class StudentsRepositorie implements ICreateStudant {
    async create({ student, email, password }: ICreateStudantType): Promise<IStudants> {
        const dataBase = await prisma.student.create({
            data:{
                student, email, password
            }
        });
    
        return dataBase;
    }

    async login({ email, password }: ILoginType): Promise<IStudants | null> {
        const studentLogin = await prisma.student.findMany({
            where:{
                email, password
            }
        })

        return studentLogin as unknown as IStudants;
    }
    
}