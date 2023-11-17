import { Router } from "express";
import { ICreateStudantType } from "../interfaces/students.interface";
import { StudentUseCase } from "../usecases/student.usecase";

export const createStudentRouter = Router();

createStudentRouter.post("/sign", async (req, res)=>{
    const { student, email, password}:ICreateStudantType = req.body;

    if(!student || !email || !password) throw new Error ("ERROR! Provide all creation parameters!")

    try {

        const studentUseCase = new StudentUseCase();
        const repositorieStudent = await studentUseCase.create({ student, email, password });


        return res.send(repositorieStudent)
        
    } catch (error) {
        console.log(error);
        return res.end();
    }
})