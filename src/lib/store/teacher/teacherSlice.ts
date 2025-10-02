import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../global/types";
import { ITeacher, Iteacher, IteacherState } from "./teacherSlice.types";
import { AppDispatch } from "../store";
import API from "@/lib/http";

const initialState:IteacherState = {
    teachers: [],
    status:Status.Loading
}

const teacherSlice = createSlice({
    name: "teacher",
    initialState,
    reducers:{
        setStatus(state:IteacherState,action:PayloadAction<Status>){
            state.status =action.payload
        },
        resetStatus(state:IteacherState){
            state.status = Status.Loading
        },
        setTeacher(state:IteacherState,action:PayloadAction<Iteacher[]>){
            state.teachers = action.payload
        },
        addTeacher(state:IteacherState,action:PayloadAction<Iteacher>){
            state.teachers.push(action.payload)
        },
        removeTeacher(state:IteacherState,action:PayloadAction<string>){
            const index = state.teachers.findIndex((item)=>item.id ===action.payload)
            if(index !== -1){
                state.teachers.splice(index,1)
            }
        }
    }
})

export const {setStatus,resetStatus,setTeacher,addTeacher,removeTeacher} =  teacherSlice.actions
export default teacherSlice.reducer

export function fetchTeacher(token:string){
    return async function fetchTeacherThunk(dispatch:AppDispatch) {
        try {
            const response = await API.get('/institute/teacher',{
                headers:{
                    Authorization: `${token}`
                }
            })
            if(response.status === 200){
                dispatch(setStatus(Status.Success))
                dispatch(setTeacher(response.data.data))
                dispatch(resetStatus())
            }else{
                dispatch(setStatus(Status.Error))
            }
            console.log(response,"Check data...")
        } catch (error) {
            console.log(error)
               dispatch(setStatus(Status.Error))
        }
            
    }
}
export function createTeacher(token:string,data:ITeacher){
    return async function createTeacherThunk(dispatch:AppDispatch){
        try {
            const response = await API.post('/institute/teacher',data,{
                headers:{
                    Authorization: `${token}`,
                    "Content-Type": "multipart/form-data"
                },                
            })
            if(response.status === 201){
                dispatch(setStatus(Status.Success))
                dispatch(addTeacher(response.data.data[0]))
            }else{
                dispatch(setStatus(Status.Error))
            }
            console.log(response.data.data[0],"arjun kumar pun")
        } catch (error) {
            console.log(error)
              dispatch(setStatus(Status.Error))
        }
    }
}
export function deleteTeacher(token:string,id:string){
    return async function deleteTeacherThunk(dispatch:AppDispatch){
        try {
            const response = await API.delete('/institute/teacher/'+id,{
                headers:{
                    Authorization: `${token}`,
                },                
            })
            if(response.status === 200){
                dispatch(setStatus(Status.Success))
                dispatch(removeTeacher(id))
            }else{
                dispatch(setStatus(Status.Error))
            }
            console.log(response,"data........")
        } catch (error) {
            console.log(error)
              dispatch(setStatus(Status.Error))
        }
    }
}