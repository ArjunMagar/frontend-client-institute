import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Status } from "../global/types";
import { ILesson, ILessonState } from "./lessonSlice.types";
import API from "@/lib/http";



const initialState: ILessonState = {
    instituteNumber: '',
    lessons: [],
    status: Status.Loading
}

const lessonSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {
        setStatus(state: ILessonState, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setLessons(state: ILessonState, action: PayloadAction<ILesson[]>) {
            state.lessons = action.payload
        },
        setInstituteId(state: ILessonState, action: PayloadAction<string>) {
            state.instituteNumber = action.payload
        },
        resetStatus(state: ILessonState) {
            state.status = Status.Loading
        }

        // deleteCourses(state:ICourseState,action:PayloadAction<string>){
        //     const index = state.courses.findIndex((item)=>item.courseId === action.payload)
        //        if(index !== -1){
        //         state.courses.splice(index,1)
        //     }
        // }


    }
})


export const { setStatus, setLessons, resetStatus, setInstituteId } = lessonSlice.actions
export default lessonSlice.reducer


export function fetchLessons(token: string, chapterId: string, instituteId: string) {
    return async function fetchLessonsThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get(`/student/course/${chapterId}/lessons?instituteNumber=${instituteId}`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(response, "response")
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setLessons(response.data.data.lessons))
                dispatch(setInstituteId(response.data.data.instituteNumber))
                dispatch(resetStatus())
            } else {
                dispatch(setStatus(Status.Error))
            }

        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function fetchLesson(token: string, lessonId: string, instituteId: string) {
    return async function fetchLessonThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get(`/student/course/lessons/${lessonId}?instituteNumber=${instituteId}`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(response, "response")
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setLessons(response.data.data))
                dispatch(resetStatus())
            } else {
                dispatch(setStatus(Status.Error))
            }

        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}


