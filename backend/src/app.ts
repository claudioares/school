import express from 'express';
import cors from 'cors'
import { createStudent } from './routers/students.routes/create.student.router';
import { loginStudent } from './routers/students.routes/login.student.router';
import { teacherGetStudents } from './routers/teachers.router/teacherGetStudents';
import { loginTeacher } from './routers/teachers.router/login.teacher.router';
import { createTeacher } from './routers/teachers.router/create.teacher.router';
import { getStudentId } from './routers/students.routes/getStudentId.router';
import { updateStudent } from './routers/students.routes/update.student.router';

export const app = express();


app.use(cors);
app.use(express.json());
app.use(createStudent);
app.use(loginStudent);
app.use(getStudentId);
app.use(updateStudent);


app.use(teacherGetStudents);
app.use(loginTeacher);
app.use(createTeacher);


