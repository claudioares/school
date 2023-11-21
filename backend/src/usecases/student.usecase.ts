import { authTokenCreate } from "../ middlewares/auth.token.create";
import { authVerifyEmail } from "../ middlewares/auth.verify.email";
import { authVerifyPassword } from "../ middlewares/auth.verify.password";
import { IStudants } from "../interfaces/students.interface";
import { StudentsRepositorie } from "../repositories/students.repositorie";


export class StudentUseCase {
    
    private studentRepositorie:StudentsRepositorie
    constructor(){
        this.studentRepositorie = new StudentsRepositorie();
    }

    async create(student:string, email:string, password:string){
        const verifyEmailExist = await authVerifyEmail(email);
        if(verifyEmailExist.length > 0) throw new Error ("ERROR! This email is already registered!");
        
        const studentRepositorie = await this.studentRepositorie.create({student, email, password});

        return studentRepositorie;
    }

    async login (email:string, password:string):Promise<IStudants | null | string | {}> {
        const authVerifyEmailExist = await authVerifyEmail(email);
        if(authVerifyEmailExist.length <= 0) {
            return "ERROR! Email or password not authorized!"
        }
        
        const VerifyPassword = await authVerifyPassword(password, email);    
        if(!VerifyPassword) {
            return "ERROR! Student not authorized!"
        }
        
        
        const studentLogin = await this.studentRepositorie.login(email)
        const [{password:_, ...studentNotPassword},...student]:any = studentLogin;
        
        const jwtToken = await authTokenCreate(studentLogin?.id)

    
        return [studentNotPassword, jwtToken];
    }
}