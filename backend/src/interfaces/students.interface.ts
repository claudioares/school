
export interface IStudants {
    id: string;
    student: string;
    email: string;
    password: string;
    birth: Date | null;
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


export interface IMethodsStudant {
    create({student, email, password }:ICreateStudantType):Promise<IStudants>
    login(email:string):Promise<IStudants | null>
}
