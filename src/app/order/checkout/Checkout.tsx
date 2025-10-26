"use client"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { createOrder, resetStatus } from "@/lib/store/order/orderSlice";
import { Iorder } from "@/lib/store/order/orderSlice.types";
import { Status } from "@/lib/store/global/types";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { fetchInstituteCourse } from "@/lib/store/course/courseSlice";


const Checkout = () => {
    const { courses } = useAppSelector((store) => store.course)
    const { status } = useAppSelector((store) => store.order)
    const dispatch = useAppDispatch()

    const searchParams = useSearchParams()
    const instituteId = searchParams.get("instituteId")
    const courseId = searchParams.get("courseId")

    useEffect(() => {
        if (!instituteId || !courseId) return alert("no courseId, instituteId")
        dispatch(fetchInstituteCourse(instituteId, courseId))

    }, [instituteId, courseId])

    const subTotal = courses.reduce((total, course) => Number(course.coursePrice) + total, 0)
    const totalQty = courses.length
    const TaxCharge = (13 / 100) * subTotal
    const Total = subTotal + TaxCharge

    const orderDetails = courses.map((course) => {
        return (
            {
                courseId: course.courseId,
                instituteId: course.instituteId
            }
        )
    })
    const [data, setData] = useState<Iorder>({
        whatsapp_no: "",
        paymentMethod: "",
        remarks: "",
        amount: 0,
        orderDetails: []
    })
    useEffect(() => {
        setData((prev) => ({
            ...prev,
            amount: Total,
            orderDetails: orderDetails,

        }));
    }, [courses]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };
    console.log(data, "data")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token"); // get from localStorage or get from Redux
        if (!token) return alert("Token not found");

        dispatch(createOrder(data, token));
    };

    useEffect(() => {
        if (status === Status.Success) {          
            dispatch(resetStatus())
        }
    }, [status])

    return (
        <>
            {/* Checkout Section */}
            <section id="portfolio" className="portfolio" >
                <div className="container" style={{ paddingTop: "60px" }}>
                    <div className="bg-gray-100 py-8">
                        <div className="container mx-auto px-4">
                            <h1 className="text-2xl font-semibold mb-4" style={{ fontSize: "24px" }}>Student Enrollment Details:</h1>
                            {courses.length > 0 && (
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="md:w-3/4">
                                            <div className="bg-white rounded-lg shadow-md p-6 mb-4" style={{ padding: "24px", marginBottom: "16px" }}>
                                                <div className="bg-white p-1 xs:p-8">
                                                    <div className=" max-w-96 sm:max-w-4xl mx-auto  rounded-lg p-8">
                                                        <div>
                                                            <div className="space-y-6">

                                                                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                                                                    {/* Phone Number */}
                                                                    <div className="form-group">
                                                                        <label htmlFor="whatsapp_no" className="block text-sm font-medium text-gray-700 mb-1">
                                                                            WhatsApp Number
                                                                        </label>
                                                                        <input
                                                                            type="tel"
                                                                            id="whatsapp_no"
                                                                            name="whatsapp_no"
                                                                            onChange={handleChange}
                                                                            placeholder="+977 9812345678"
                                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                                                                            required
                                                                        />
                                                                    </div>
                                                                    {/* PaymentMethod */}
                                                                    <div className="form-group">
                                                                        <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 !mb-1">Payment <span className="font-light">(Optional)</span></label>
                                                                        <select
                                                                            onChange={handleChange}
                                                                            name="paymentMethod"
                                                                            id="paymentMethod"
                                                                            className="h-[50px] rounded-[5px] text-s xs:text-sm w-full !px-4 !py-3 border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition "
                                                                            required>
                                                                            <option hidden>Select</option>
                                                                            <option value="esewa">Esewa</option>
                                                                            <option value="khalti">Khalti</option>
                                                                            <option value="cod">COD</option>
                                                                        </select>
                                                                    </div>

                                                                </div>
                                                                <div>
                                                                    {/* Remarks */}
                                                                    <div className="form-group">
                                                                        <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                                                                            Remarks
                                                                        </label>
                                                                        <input
                                                                            type="text"
                                                                            id="remarks"
                                                                            name="remarks"
                                                                            onChange={handleChange}
                                                                            placeholder="Remarks..."
                                                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
                                                                            required
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="bg-white rounded-lg shadow-md p-6 mb-4" style={{ padding: "24px", marginBottom: "16px" }}>
                                                <table className="w-full">
                                                    <thead>
                                                        <tr>
                                                            <th className="text-left font-semibold">Product</th>
                                                            <th className="text-left font-semibold">Name</th>
                                                            <th className="text-left font-semibold">Duration</th>
                                                            <th className="text-left font-semibold">Price</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        {courses.length > 0 && courses.map((item) => {
                                                            return (
                                                                <tr key={item.courseId}>
                                                                    <td className="py-4" style={{ padding: "16px 0px" }}>
                                                                        <div className="flex items-center">
                                                                            <img className="h-16 w-16 mr-4" src={item.courseThumbnail} alt="Product image" />
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4" style={{ padding: "16px 0px" }}>
                                                                        <div className="flex items-center">
                                                                            <span className="font-semibold">{item.courseName}</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4" style={{ padding: "16px 0px" }}>
                                                                        <div className="flex items-center">
                                                                            <span className="font-semibold">{item.courseDuration} days</span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="py-4" style={{ padding: "16px 0px" }}>Rs {item.coursePrice}</td>
                                                                </tr>
                                                            )
                                                        })}

                                                        {/* More product rows */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="md:w-1/4">
                                            <div className="bg-white rounded-lg shadow-md p-6" style={{ padding: "24px" }}>
                                                <h2 className="text-lg font-semibold mb-4" style={{ marginBottom: "16px", fontSize: "18px" }} >Order Detail</h2>
                                                <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                                    <span>Subtotal</span>
                                                    <span>Rs: {subTotal}</span>
                                                </div>
                                                <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                                    <span>Total Items</span>
                                                    <span>Qty: {totalQty}</span>
                                                </div>
                                                <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                                    <span>Tax Pay: 13%</span>
                                                    <span>Rs: {TaxCharge}</span>
                                                </div>
                                                <hr className="my-2" />
                                                <div className="flex justify-between mb-2" style={{ marginBottom: "8px" }}>
                                                    <span className="font-semibold">Total</span>
                                                    <span className="font-semibold">Rs: {Total}</span>
                                                </div>
                                                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full btn" style={{ padding: "8px 16px", marginTop: "16px" }}>Click to Pay</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>) ||
                                (<div className="flex flex-col md:flex-row gap-4 justify-center">
                                    <Link href="/#services"><h3 className="btn">-Go to enroll InstituteCourses-</h3></Link>
                                </div>)
                            }
                        </div>
                    </div>

                </div>
            </section>

        </>
    );
}

export default Checkout;