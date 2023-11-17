import { authVerifyEmail } from "../ middlewares/auth.verify.email";
import { authVerifyPassword } from "../ middlewares/auth.verify.password";
import { ICreateStudantType, ILoginType, IStudants } from "../interfaces/students.interface";
import { StudentsRepositorie } from "../repositories/students.repositorie";


export class StudentUseCase {
    
    private studentRepositorie:StudentsRepositorie
    constructor(){
        this.studentRepositorie = new StudentsRepositorie();
    }

    async create({student, email, password}:ICreateStudantType){
        const verifyEmailExist = await authVerifyEmail(email);
        if(verifyEmailExist) throw new Error ("ERROR! This email is already registered!");
        
        const studentRepositorie = await this.studentRepositorie.create({student, email, password});

        return studentRepositorie;
    }

    async login ({email, password}:ILoginType):Promise<IStudants | null> {
        const verifyEmailExist = await authVerifyEmail(email);
        if(verifyEmailExist.length <= 0) throw new Error ("ERROR! Email not authorized!")

        const verifyPassword = await authVerifyPassword(password);    
        if(verifyPassword.length <= 0) throw new Error ("ERROR! Student not authorized!")
        

        const studentLogin = await this.studentRepositorie.login({email, password})
        return studentLogin;
    }
}