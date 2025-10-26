import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../global/types";
import API from "@/lib/http";
import { AppDispatch } from "../store";
import { Iorder, IOrderState } from "./orderSlice.types";


const initialState: IOrderState = {
    orders: [],
    status: Status.Loading,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        setStatus(state: IOrderState, action: PayloadAction<Status>) {
            state.status = action.payload;
        },
        resetStatus(state: IOrderState) {
            state.status = Status.Loading
        },
        setOrder(state: IOrderState, action: PayloadAction<[]>) {
            state.orders = action.payload;
        }

    },
});

export const { setStatus, resetStatus,setOrder } = orderSlice.actions;
export default orderSlice.reducer;

export function createOrder(data: Iorder, token: string) {
    return async function createOrderThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post("/student/order", data, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response.status === 200) {
                dispatch(setStatus(Status.Success));
               
                if(response.data.data.payment_url){
                     window.location.href = response.data.data.payment_url
                }else{
                    window.location.href = response.data.data
                }

            } else {
                dispatch(setStatus(Status.Error));
            }
            console.log(response, "respose")
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.Error));
        }
    };
}
export function khaltiPaymentVerify(data:string, token: string) {
    return async function khaltiPaymentVerifyThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post("/student/order/khalti/verify-transaction",{pidx:data}, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response.status === 200) {
                dispatch(setStatus(Status.Success));
               
            } else {
                dispatch(setStatus(Status.Error));
            }
            console.log(response, "respose")
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.Error));
        }
    };
}
export function esewaPaymentVerify(data:string, token: string) {
    return async function esewaPaymentVerifyThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post("/student/order/esewa/verify-transaction", {encodedData :data}, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            if (response.status === 200) {
                dispatch(setStatus(Status.Success));
               
            } else {
                dispatch(setStatus(Status.Error));
            }
            console.log(response, "respose")
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.Error));
        }
    };
}