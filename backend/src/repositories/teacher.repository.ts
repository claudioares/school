import { prisma } from "../database/prisma.config";
import { IStudants } from "../interfaces/students.interface";
import { IMethodsForTeachers } from "../interfaces/teachers.interface";

export class TeacherRepository implements IMethodsForTeachers {
   async getStudents(): Promise<IStudants | null> {
       const studentsData = await prisma.student.findMany();

       return studentsData as unknown as IStudants;
   }
}