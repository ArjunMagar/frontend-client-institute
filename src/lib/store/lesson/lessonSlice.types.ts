import { Status } from "../global/types"



export interface Ilesson {
    lessonName: string,
    lessonDescription:string,
    lessonVideoUrl:string
    lessonThumbnailUrl:string
}
export interface ILesson extends Ilesson {
    id: string, 
    chapterId:string,   
    createdAt: string,
    updatedAt: string
}


export interface ILessonState {
    instituteNumber:string,
    lessons: ILesson[],
    status: Status
}