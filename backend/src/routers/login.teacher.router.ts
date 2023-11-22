import { Router } from "express";
import { TeacherUseCase } from "../usecases/teacher.usecase";
import { ILoginType } from "../interfaces/students.interface";


export const loginTeacher = Router();

type TypeQuery = {
    email: string,
    password: string,
}

loginTeacher.post('/teacher/login', async (req, res)=>{
    const {email, password}: ILoginType = req.body as TypeQuery;

    if(!email || !password){
        return "Erro! All requerid!"
    }


    try {

        const teacherUseCase = new TeacherUseCase();
        const result = await teacherUseCase.loginTeacher(email, password) as []


        const teacherData = result.shift();
        const tokenJwt = result.pop();


        return res.json({
            teacher: teacherData,
            token: tokenJwt,
        })
        
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: "Error during authentication!" });
    }
})