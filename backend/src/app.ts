import express from 'express';
import { createStudentRouter } from './routers/create.student.router';
import { loginStudent } from './routers/login.student.router';
import { getStudentsTeacher } from './routers/getStudents.teacher';
import { loginTeacher } from './routers/login.teacher.router';
import { createdTeacher } from './routers/create.teacher.router';

export const app = express();
app.use(express.json());
app.use(createStudentRouter);
app.use(loginStudent);
app.use(getStudentsTeacher);
app.use(loginTeacher);
app.use(createdTeacher);


