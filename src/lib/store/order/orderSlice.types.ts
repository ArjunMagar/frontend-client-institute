import { Status } from "../global/types";

export interface IcourseDetails{
courseId: string,
instituteId: string
}

export interface Iorder{
    whatsapp_no: string,
    paymentMethod: string,
    remarks: string,
    amount:number
    orderDetails:IcourseDetails[]
}



export interface IOrderState {
    orders:Iorder[],
    status: Status
}