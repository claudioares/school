import { authTokenCreate } from "../ middlewares/auth.token.create";
import { authVerifyEmail } from "../ middlewares/auth.verify.email";
import { authVerifyPassword } from "../ middlewares/auth.verify.password";
import { ITeacherAuthorized, ITeacherCreate } from "../interfaces/teachers.interface";
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

    async loginTeacher (email:string, password:string):Promise<ITeacherAuthorized | null | string | {}> {
        const VerifyPassword = await authVerifyPassword(password, email, "teachers");
        if(!VerifyPassword) {
            return "ERROR! Not authorized!"
        }
        
        
        const repositorieTeacherLogin = await this.teacherRepository.loginTeacher(email)
        const jwtToken = await authTokenCreate(repositorieTeacherLogin?.id)
        
        const [{password:_, ...teacherNotPassword},...student]:any = repositorieTeacherLogin;

        return [teacherNotPassword, jwtToken]
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