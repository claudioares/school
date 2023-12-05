import { authVerifyEmail } from "../ middlewares/auth.verify.email";
import { authVerifyId } from "../ middlewares/auth.verify.id";
import { authVerifyPassword } from "../ middlewares/auth.verify.password";
import { IStudants, IUpdateStudentId } from "../interfaces/students.interface";
import { StudentsRepositorie } from "../repositories/students.repositorie";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


type JwtPeload = {
    id: number;
}
export class StudentUseCase {
    
    private studentRepositorie:StudentsRepositorie
    constructor(){
        this.studentRepositorie = new StudentsRepositorie();
    }

    async create(student:string, email:string, password:string){
        const verifyEmailExist: any = await authVerifyEmail(email, "student");
        if(verifyEmailExist.length > 0) throw new Error ("ERROR! This email is already registered!");

        const hashPassword = await bcrypt.hash(password, 10);

        const studentRepositorie = await this.studentRepositorie.create({student, email, password:hashPassword});

        return studentRepositorie;
    }

    async login (email:string, password:string):Promise<IStudants | null | string | {}> {
        const authVerifyEmailExist: any = await authVerifyEmail(email, "student");
        if(authVerifyEmailExist.length <= 0) {
            throw new Error ("ERROR! Email or password not authorized!")
        }
        
        const verifyPassword = await authVerifyPassword(password, email, "student");

       
        if(!verifyPassword) {
            throw new Error ("ERROR! Student not authorized!")
        }
        
        
        const studentLogin = await this.studentRepositorie.login(email)
        if(!studentLogin){throw new Error ("Student not found!")}

        const [{password:_, ...studentNotPassword},...student]:any = studentLogin;
        
        const token = jwt.sign({id: studentNotPassword.id}, process.env.HASHTOKEN ?? '', {expiresIn: '8h'});

    
        return [studentNotPassword, token];
    }

    async getStudentId (id: string):Promise<IStudants | string | boolean> {
        const verifyId = await authVerifyId(id);
        
        if (!verifyId) {return false};

        const studentId = await this.studentRepositorie.getStudentId(id)

        return studentId;
    }

    async updateStudentId (authorization:string | undefined, data:IUpdateStudentId):Promise<string> {

        if(!authorization) {throw new Error ("Not authorization!")}
        const tokenUser = authorization.split(" ")[1];

        const {id:_id} = jwt.verify(tokenUser, process.env.HASHTOKEN ?? '') as JwtPeload;
        const userId = String(_id)
        const dataStudent = await this.studentRepositorie.getStudentId(userId) as IUpdateStudentId;
        if(!dataStudent) {throw new Error ("Student not found!")};

        const password = await bcrypt.hash(dataStudent.password, 10);

        const email = dataStudent.email
        const {email:_email, password:_password, ...user} = data;
        const dataUser = {email, password, ...user}

        const resultRepsitorie = await this.studentRepositorie.updateStudentId(dataUser) as IUpdateStudentId;

        if(!resultRepsitorie.id){ throw new Error ("Student not found!")}

        return "Change successful!";
    }
}