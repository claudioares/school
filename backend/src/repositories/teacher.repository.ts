import { prisma } from "../database/prisma.config";
import { IStudants } from "../interfaces/students.interface";
import { IMethodsForTeachers, ITeacherAuthorized, ITeacherCreate, ITeachers } from "../interfaces/teachers.interface";

export class TeacherRepository implements IMethodsForTeachers {
    async loginTeacher(email: string): Promise<ITeachers> {
        const teacherData = await prisma.teacher.findMany({
            where:{
                email
            }
        })

        return teacherData as unknown as ITeachers;
    }
    async teacherGetStudents(): Promise<IStudants | null> {
       const studentsData = await prisma.student.findMany();
       return studentsData as unknown as IStudants;
    }

    async create({ 
        name, email, password, endress, curriculum, 
        formation, disciplines, date_of_birth, teacher 
    }: ITeacherCreate): Promise<ITeachers> {

        const teacherCreated = await prisma.teacher.create({
            data:{
                name, email, password, endress, curriculum, formation, disciplines, date_of_birth, teacher
            }
        })

        return teacherCreated as unknown as ITeachers
    }

}