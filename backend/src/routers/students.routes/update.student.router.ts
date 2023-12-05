import { Router } from "express";
import { StudentUseCase } from "../../usecases/student.usecase";

export const updateStudent = Router();

updateStudent.patch('/student/update', async (req, res)=>{
 try {
    const body = req.body;
    const {
        authorization
    } = req.headers

    const useUseCase = new StudentUseCase();
    const resultUseUseCase = await useUseCase.updateStudentId(authorization, body)

    return res.status(201).json({messege: resultUseUseCase})
    
 } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ error: "Error during authentication!" }).end()
 };


})