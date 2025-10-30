import { Status } from "../global/types"



export interface Ichapter {
    chapterName: string,
    chapterDuration: string,
    chapterLevel: string
}
export interface IChapter extends Ichapter {
    id: string,
    courseId: string,
    createdAt: string,
    updatedAt: string
}


export interface IChapterState {
    instituteNumber: string,
    chapters: IChapter[],
    status: Status
}