import { Status } from "../global/types";
export interface ITeacher {
    teacherName: string,
    teacherEmail: string,
    teacherPhoneNumber: string,
    teacherExpertise: string,
    teacherSalary: string,
    teacherJoinedDate: string,
    teacherPhoto: string,
    courseId: string,
    teacherPhotoUrl:string

}


export interface Iteacher extends ITeacher{
    id: string,
    salary:string
    joinedDate:string
    createdAt: string,
    updatedAt: string
}
export interface IteacherState {
    teachers: Iteacher[],
    status: Status
}