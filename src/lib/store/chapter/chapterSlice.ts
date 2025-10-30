import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { Status } from "../global/types";
import { IChapter, IChapterState } from "./chapterSlice.types";
import API from "@/lib/http";



const initialState: IChapterState = {
    instituteNumber: '',
    chapters: [],
    status: Status.Loading
}

const chapterSlice = createSlice({
    name: "chapter",
    initialState,
    reducers: {
        setStatus(state: IChapterState, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        setChapters(state: IChapterState, action: PayloadAction<IChapter[]>) {
            state.chapters = action.payload
        },
        setInstituteId(state: IChapterState, action: PayloadAction<string>) {
            state.instituteNumber = action.payload
        },
        resetStatus(state: IChapterState) {
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


export const { setStatus, setChapters, resetStatus, setInstituteId } = chapterSlice.actions
export default chapterSlice.reducer


export function fetchChapters(token: string, courseId: string, instituteId: string) {
    return async function fetchChaptersThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get(`/student/course/${courseId}/chapters?instituteNumber=${instituteId}`, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(response, "response")
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setChapters(response.data.data.chapters))
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

