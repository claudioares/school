import { Router } from "express";
import { StudentUseCase } from "../../usecases/student.usecase";
import { IStudants } from "../../interfaces/students.interface";

export const getStudentId = Router()

type QueryRequest = {
    id: string
}

getStudentId.get('/student/id', async (req, res)=>{
  
    try {
        const {id}:QueryRequest = req.query as QueryRequest;

        const studentUseCase = new StudentUseCase();
        const result:IStudants | string = await studentUseCase.getStudentId(id) as IStudants
        

        if (!result) return res.json({messege: "ERROR! Student not Foud!"});

        const {password, ...student} = result;


        return res.json({
            messege:student
        })
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ error: "Error during authentication!" }).end();
    }

})