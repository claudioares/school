import { Router } from "express";
import { ILoginType } from "../interfaces/students.interface";
import { StudentUseCase } from "../usecases/student.usecase";


export const loginStudent = Router();



loginStudent.post('/login', async (req, res) => {
    const { email, password }: ILoginType = req.body;
    if (!email || !password) res.send("Email/Password requerid!");

    try {

        const studentUseCase = new StudentUseCase();
        const result = await studentUseCase.login(email, password) as [];


        const studentData = result.shift();
        const tokenJwt = result.pop();

        

        return res.json({
            student: studentData,
            token: tokenJwt,
        });

        
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: "Error during authentication!" });
    }
})