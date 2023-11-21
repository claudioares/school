import { TeacherRepository } from "../repositories/teacher.repository";

export class TeacherUseCase {
    private teacherRepository : TeacherRepository;
    constructor(){
        this.teacherRepository = new TeacherRepository()
    }


    async getStudent (id:string) {
        const resultRepositorie = await this.teacherRepository.getStudents();
        return resultRepositorie;
    }
}