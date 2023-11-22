import { Router } from "express";
import { TeacherUseCase } from "../../usecases/teacher.usecase";


export const getStudentsTeacher = Router();

getStudentsTeacher.get('/students/teacher', async (req, res)=>{
    const {id}:any = req.query
    try {
        const dataStudents = new TeacherUseCase();
        const resultDataStudents = await dataStudents.getStudent(id);
        
        return res.json({
            resultDataStudents,
        })
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: "Error during authentication!" });
    }
})