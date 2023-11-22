import { IStudants } from "./students.interface";

export interface ITeachers {
    id: string,
    name: string,
    email: string,
    password: string,
    endress: string,
    curriculum: string,
    formation: string,
    Disciplines: string,
    Date_of_birth: string,
    teacher: boolean,
}

export interface ITeacherCreate {
    name: string,
    email: string,
    password: string,
    endress: string,
    curriculum: string,
    formation: string,
    disciplines: string,
    date_of_birth: string,
    teacher: boolean,
}
export interface ITeacherAuthorized {
    email: string,
    password: string,
}


export interface IMethodsForTeachers {
    loginTeacher({email, password}:ITeacherAuthorized):Promise<ITeachers>
    getStudents ():Promise<IStudants | null>
    create({
        name, email, password, endress, curriculum, 
        formation, disciplines, date_of_birth, teacher
    }:ITeacherCreate):Promise<ITeachers>
}