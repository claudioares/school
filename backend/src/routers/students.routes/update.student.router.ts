import { Router } from "express";
import { StudentUseCase } from "../../usecases/student.usecase";
import { IStudants, IUpdateStudentId } from "../../interfaces/students.interface";
import bcrypt from "bcrypt";


export const updateStudent = Router();

updateStudent.patch('/student/update', async (req, res)=>{
 try {
    const body = req.body;
    const {
        id
    } = req.query

    if(!body || !id) {
        return res.json({messege: "ERRO! All requerid!"});
    }

    const {password, ...student} = body
    const hashPassword = await bcrypt.hash(password, 10);
    

    const data:IUpdateStudentId = {id, password:hashPassword, ...student}

   


    const studentUseCase = new StudentUseCase();
    const result:IStudants | string = await studentUseCase.updateStudentId(data) as IStudants;

    const {password:_, ...resultSTUDENT} = result;


    return res.status(201).json({
        messege: resultSTUDENT
    })
 } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ error: "Error during authentication!" }).end()
 };


})