import { Router } from "express";
import { ITeacherCreate } from "../../interfaces/teachers.interface";
import { TeacherUseCase } from "../../usecases/teacher.usecase";
import bcrypt from "bcrypt";


export const createTeacher = Router();


createTeacher.post("/create/teacher", async (req, res)=>{
    const {
        name, email, password, curriculum, date_of_birth,
        disciplines, endress, formation, teacher
    }:ITeacherCreate = req.body

    if( 
        !name || !email || 
        !password || !curriculum || 
        !date_of_birth || !disciplines || 
        !endress || !formation || !teacher
    ) throw new Error ("Erro! All requerid!");

    const hashPassword = await bcrypt.hash(password, 10);


    try {
        const teacherUseCase = new TeacherUseCase();
        const createdNewTeacher = await teacherUseCase.createTeacher({
            name, email, password: hashPassword, curriculum, date_of_birth,
            disciplines, endress, formation, teacher
        });

        return res.status(201).json({
            messege: createdNewTeacher
        })
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: "Error during authentication!" });
    }
})