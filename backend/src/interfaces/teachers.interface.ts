import { IStudants } from "./students.interface";

export interface ITeachers {
    id: string,
    name: string,
    email: string,
    endress: string,
    curriculum: string,
    formação: string,
    Disciplines: string,
    Date_of_birth: string,
    teacher: boolean,
}

export interface ITeacherAuthorized {
    email: string,
    password: string,
}


export interface IMethodsForTeachers {
    // loginTeacher({email, password}:ITeacherAuthorized):Promise<ITeachers>
    getStudents ():Promise<IStudants | null>
}