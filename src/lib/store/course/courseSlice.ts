import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../global/types";
import { Icourse, ICourse, ICourseState } from "./courseSlice.types";
import API from "@/lib/http";
import { AppDispatch } from "../store";

const initialState: ICourseState = {
    courses: [],
    status: Status.Loading
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setStatus(state:ICourseState, action:PayloadAction<Status>) {
            state.status = action.payload
        },
        setCourse(state:ICourseState, action:PayloadAction<ICourse[]>) {
            state.courses = action.payload
        },
        resetStatus(state:ICourseState){
            state.status = Status.Loading
        },
        addCourse(state:ICourseState,action:PayloadAction<ICourse>){
            state.courses.push(action.payload)
        },
        deleteCourses(state:ICourseState,action:PayloadAction<string>){
            const index = state.courses.findIndex((item)=>item.courseId === action.payload)
               if(index !== -1){
                state.courses.splice(index,1)
            }
        }


    }
})


export const { setStatus, setCourse, resetStatus, addCourse,deleteCourses} = courseSlice.actions
export default courseSlice.reducer


export function fetchCourses(token: string) {
    return async function fetchCoursesThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get('/institute/course', {
                headers: {
                    Authorization: `${token}`
                }
            })
            if(response.status === 200){
                dispatch(setStatus(Status.Success))
                dispatch(setCourse(response.data.data))
                dispatch(resetStatus())
            }else{
                dispatch(setStatus(Status.Error))
            }
          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function createCourses(token: string,data:Icourse) {
    return async function createCoursesThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post('/institute/course',data, {
                headers: {
                    Authorization: `${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            console.log(response,"chekc.........")
            if(response.status === 201){
                dispatch(setStatus(Status.Success))
                dispatch(addCourse(response.data.data))

            }else{
                dispatch(setStatus(Status.Error))
            }
          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function deleteCourse(token:string,id:string) {
    return async function deleteCourseThunk(dispatch: AppDispatch) {
        try {
            const response = await API.delete('/institute/course/'+id, {
                headers: {
                    Authorization: `${token}`
                }
            })
            console.log(response)
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(deleteCourses(id))
            }else{
                dispatch(setStatus(Status.Error))
            }

        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function fetchInstituteCourses(instituteId: string) {
    return async function fetchCoursesThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get(`/student/institute/${instituteId}/courses`)

            // console.log(response,"Resultaaa")
            if(response.status === 200){
                dispatch(setStatus(Status.Success))
                dispatch(setCourse(response.data.data))
                dispatch(resetStatus())
            }else{
                dispatch(setStatus(Status.Error))
            }
          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function fetchInstituteCourse(instituteId: string,courseId:string) {
    return async function fetchCoursesThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get(`/student/institute/${instituteId}/courses/${courseId}`)

            // console.log(response,"Resultaaa")
            if(response.status === 200){
                dispatch(setStatus(Status.Success))
                dispatch(setCourse(response.data.data))
                dispatch(resetStatus())
            }else{
                dispatch(setStatus(Status.Error))
            }
          
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}