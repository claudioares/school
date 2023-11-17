import { Router } from "express";
import { ILoginType } from "../interfaces/students.interface";
import { StudentUseCase } from "../usecases/student.usecase";
import jwt from "jsonwebtoken";


export const loginStudent = Router();


loginStudent.post('/login', async (req, res) => {
    try {
        const { email, password }: ILoginType = req.body;

        if (!email || !password) res.send("Email/Password requerid!");

        const studentUseCase = new StudentUseCase();
        const result = await studentUseCase.login({ email, password })
        const secretKey = result?.password


        const token = jwt.sign({ userId: result?.id, username: result?.student }, "secretKey", { expiresIn: '1h' });


        return res.send(result);
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ error: "Error during authentication!" });
    }
})