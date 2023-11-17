import express from 'express';
import { createStudentRouter } from './routers/create.student.router';
import { loginStudent } from './routers/login.student.router';

export const app = express();
app.use(express.json());
app.use(createStudentRouter);
app.use(loginStudent);


