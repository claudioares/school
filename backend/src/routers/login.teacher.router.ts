import { Router } from "express";
import { TeacherUseCase } from "../usecases/teacher.usecase";


export const loginTeacher = Router();


loginTeacher.post('/teacher/login', async (req, res)=>{
    const {email, password} = req.query;

    if(!email || !password) throw new Error ("Erro! All requerid!");

    try {
        const teacherUseCase = await new TeacherUseCase();

        return res.json({
            teacherUseCase
        })
        
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: "Error during authentication!" });
    }
})