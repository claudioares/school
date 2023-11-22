import { authVerifyEmail } from "../ middlewares/auth.verify.email";
import { ITeacherCreate } from "../interfaces/teachers.interface";
import { TeacherRepository } from "../repositories/teacher.repository";

export class TeacherUseCase {
    private teacherRepository : TeacherRepository;
    constructor(){
        this.teacherRepository = new TeacherRepository()
    }


    async getStudent (id:string) {
        const resultRepositorie = await this.teacherRepository.getStudents();
        return resultRepositorie;
    }

    async loginTeacher (email:string, password:string) {
        const resultRepositorie = await this.teacherRepository.loginTeacher({email, password})

        return resultRepositorie
    }

    async createTeacher (
        {
            name, email, password, curriculum, 
            date_of_birth, disciplines, formation, 
            endress, teacher
        }:ITeacherCreate
    ) {
        const verifyEmail:any = await authVerifyEmail(email, "teacher");
        
        if(verifyEmail.length > 0 ){
            return "ERROR! This email is already registered!"
        };


        const createUseCase = await this.teacherRepository.create({
            name, email, password, curriculum, 
            date_of_birth, disciplines, formation, 
            endress, teacher
        });

        return createUseCase;
    }
}