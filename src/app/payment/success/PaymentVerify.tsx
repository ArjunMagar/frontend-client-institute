"use client"
import { IDecodedToken } from "@/app/institute/institute.types";
import { Status } from "@/lib/store/global/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { esewaPaymentVerify, khaltiPaymentVerify, resetStatus } from "@/lib/store/order/orderSlice";
import { jwtDecode } from "jwt-decode";
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
        if (!token) return;
        if (pidx) {
            dispatch(khaltiPaymentVerify(pidx, token))
        } else if (data) {
            dispatch(esewaPaymentVerify(data, token))
        }
    }, [pidx, dispatch,router, data])

    useEffect(() => {
        if (status === Status.Success) {
            dispatch(resetStatus())
            const token = localStorage.getItem("token");
            if (!token) return;
            try {
                const decoded: IDecodedToken = jwtDecode(token);
                // Only students are allowed after successful payment
                if (decoded.role !== "student") {
                    alert("Order payment successfully,Please! login again as student for firstTime while enrolling our course")
                    localStorage.removeItem("token")
                    router.replace("/auth/login");
                    return;
                }
            } catch (error) {
                console.log(error);
            }
            router.replace("/");
            alert("Order payment successfully !!!")
        }
    }, [status,dispatch,router])
    return (
        <div>
            processing...

        </div>
    );
}

export default PaymentVerify;