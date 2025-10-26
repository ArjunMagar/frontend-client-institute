"use client"
import { Status } from "@/lib/store/global/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { esewaPaymentVerify, khaltiPaymentVerify, resetStatus } from "@/lib/store/order/orderSlice";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect } from "react";

const PaymentVerify = () => {

    const params = useSearchParams();
    const pidx = params.get("pidx")
    const data = params.get("data")
    const { status } = useAppSelector((store) => store.order)
    const dispatch = useAppDispatch()
    const router = useRouter()
    useEffect(() => {
        const token = localStorage.getItem("token"); // get from localStorage or get from Redux
        if (!token) return alert("Token not found");

        if (pidx) {
            dispatch(khaltiPaymentVerify(pidx, token))
        } else if (data) {
            dispatch(esewaPaymentVerify(data, token))
        }
    }, [pidx, data])

    useEffect(() => {
        if (status === Status.Success) {
            dispatch(resetStatus())
            router.push("/")
            alert("Order payment successfully !!!")
        }
    }, [status])
    return (
        <div>
            processing...

        </div>
    );
}

export default PaymentVerify;