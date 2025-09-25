import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../global/types";
import API from "@/lib/http";
import { Iinstitutes, IinstituteState } from "./instituteSlice.types";
import { Iinstitute } from "@/app/institute/institute.types";
import { AppDispatch } from "../store";


const initialState: IinstituteState = {
    institutes: [],
    status: Status.Loading,
};

const instituteSlice = createSlice({
    name: "institute",
    initialState,
    reducers: {
        setStatus(state: IinstituteState, action: PayloadAction<Status>) {
            state.status = action.payload;
        },
        setInstitute(state:IinstituteState,action:PayloadAction<Iinstitutes[]>){
            state.institutes = action.payload;
        }

    },
});

export const { setStatus,setInstitute } = instituteSlice.actions;
export default instituteSlice.reducer;

export function createInstitute(data: Iinstitute, token: string) {
    return async function createInstituteThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post("/institute", data, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response.status === 200) {
                dispatch(setStatus(Status.Success));
            } else {
                dispatch(setStatus(Status.Error));
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.Error));
        }
    };
}

export function getInstitutes() {
    return async function createInstituteThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get("/student/institute");
            console.log(response.data.data, "result")
            if (response.status === 200) {
                dispatch(setStatus(Status.Success));
                dispatch(setInstitute(response.data.data))
            } else {
                dispatch(setStatus(Status.Error));
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.Error));
        }
    };
}