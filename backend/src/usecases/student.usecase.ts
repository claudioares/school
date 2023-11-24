import { authTokenCreate } from "../ middlewares/auth.token.create";
import { authVerifyEmail } from "../ middlewares/auth.verify.email";
import { authVerifyId } from "../ middlewares/auth.verify.id";
import { authVerifyPassword } from "../ middlewares/auth.verify.password";
import { IStudants, IUpdateStudentId } from "../interfaces/students.interface";
import { StudentsRepositorie } from "../repositories/students.repositorie";



export class StudentUseCase {
    
    private studentRepositorie:StudentsRepositorie
    constructor(){
        this.studentRepositorie = new StudentsRepositorie();
    }

    async create(student:string, email:string, password:string){
        const verifyEmailExist: any = await authVerifyEmail(email, "student");
        if(verifyEmailExist.length > 0) throw new Error ("ERROR! This email is already registered!");
        
        const studentRepositorie = await this.studentRepositorie.create({student, email, password});

        return studentRepositorie;
    }

    async login (email:string, password:string):Promise<IStudants | null | string | {}> {
        const authVerifyEmailExist: any = await authVerifyEmail(email, "student");
        if(authVerifyEmailExist.length <= 0) {
            return "ERROR! Email or password not authorized!"
        }
        
        const VerifyPassword = await authVerifyPassword(password, email, "students");    
        if(!VerifyPassword) {
            return "ERROR! Student not authorized!"
        }
        
        
        const studentLogin = await this.studentRepositorie.login(email)
        const [{password:_, ...studentNotPassword},...teacher]:any = studentLogin;
        
        const jwtToken = await authTokenCreate(studentLogin?.id)

    
        return [studentNotPassword, jwtToken];
    }

    async getStudentId (id: string):Promise<IStudants | string | boolean> {
        const verifyId = await authVerifyId(id);
        
        if (!verifyId) {return false};

        const studentId = await this.studentRepositorie.getStudentId(id)

        return studentId;
    }

    async updateStudentId (data:IUpdateStudentId):Promise<IStudants | string | boolean> {
        const verifyId = await authVerifyId(data.id);
        
        if (!verifyId) {return false};

        const studentId = await this.studentRepositorie.updateStudentId(data)

        return studentId;
    }
}