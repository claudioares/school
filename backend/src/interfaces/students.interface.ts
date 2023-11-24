export interface IStudants {
    id: string;
    student: string;
    email: string;
    password: string;
    birth: string | null;
    nameMother: string | null;
    cpf: string | null;
    nameFather: string | null;
    endress: string | null;
    highSchool: boolean | null;
}[]

export interface ICreateStudantType {
    student: string,
    email: string,
    password: string,
}

export interface ILoginType {
    email: string,
    password: string,
}

export interface IUpdateStudentId {
    id: string;
    student: string;
    password: string;
    birth: string;
    nameMother: string | null;
    nameFather: string | null;
    cpf: string | null;
    endress: string | null;
    highSchool: boolean | null;
}


export interface IMethodsStudant {
    create({student, email, password }:ICreateStudantType):Promise<IStudants>
    login(email:string):Promise<IStudants | null>
    getStudentId(id:string):Promise<IStudants | null>
    updateStudentId(data:IUpdateStudentId):Promise<IStudants | string | boolean>
}
