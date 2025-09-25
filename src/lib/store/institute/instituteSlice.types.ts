import { Status } from "../global/types";



export interface Iinstitutes{
    id:string,
    instituteNumber:string,
    instituteName:string,
    institutePhoneNumber:string
}



export interface IinstituteState {
    institutes:Iinstitutes[],
    status: Status
}