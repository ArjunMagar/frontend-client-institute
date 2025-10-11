import { ICourse } from "../course/courseSlice.types";
import { Status } from "../global/types";


export interface ICart {
    courseId: string,
    instituteId: string
}

export interface ICartItem {
    course: ICourse
}


export interface ICartState {
    items: ICartItem[],
    status: Status
}