export interface ICreatedTeacher {
    name:string, 
    email: string, 
    password: string, 
    endress: string, 
    curriculum: string, 
    formation: string, 
    disciplines: string, 
    date_of_birth: string,
}
export interface IMethodsForDirectors {
    createTeacher(data:ICreatedTeacher):Promise<ICreatedTeacher>
}