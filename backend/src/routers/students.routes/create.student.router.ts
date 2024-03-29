import { Router } from "express";
import { StudentUseCase } from "../../usecases/student.usecase";

export const createStudent = Router();

createStudent.post("/sign", async (req, res)=>{
    const { student, email, password} = req.body;

    if(!student || !email || !password) throw new Error ("ERROR! Provide all creation parameters!");


    try {

        const studentUseCase = new StudentUseCase();
        const repositorieStudent = await studentUseCase.create(student, email, password);

        const {password:_, ...user} = repositorieStudent;

        return res.status(201).send(user);
        
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: "Error during creation!" });
    }
})