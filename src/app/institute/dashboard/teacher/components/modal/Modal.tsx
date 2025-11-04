"use client";

import { fetchCourses } from "@/lib/store/course/courseSlice";
import { Status } from "@/lib/store/global/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createTeacher, resetStatus } from "@/lib/store/teacher/teacherSlice";
import { ITeacher } from "@/lib/store/teacher/teacherSlice.types";
import { ChangeEvent, useEffect, useState } from "react";

type ModalProps = {
    closeModal: () => void;
};

function Modal({ closeModal }: ModalProps) {
    const { courses } = useAppSelector((store) => store.course);
    const { status } = useAppSelector((store) => store.teacher);
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState<ITeacher>({
        teacherName: "",
        teacherEmail: "",
        teacherPhoneNumber: "",
        teacherExpertise: "",
        teacherSalary: "",
        teacherJoinedDate: "",
        courseId: "",
        teacherPhoto: "",
        teacherPhotoUrl: ""

    });
    // console.log(data, "Data.........");
    // const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    //     const { name, value } = e.target
    //     setData({
    //         ...data,
    //         [name]: name == "productImage" ? e.target.files[0] as File : value
    //     })
    // }
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        if (type === "file" && e.target instanceof HTMLInputElement) {
            setData({
                ...data,
                [name]: e.target.files?.[0] || null,
            });
        } else {
            setData({
                ...data,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(createTeacher(token, data))
        }
    };

    useEffect(() => {
        if (status === Status.Success) {
            dispatch(resetStatus())
            setLoading(false);
            closeModal();
        }
    }, [status]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(fetchCourses(token));
        }
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-40 flex items-center justify-center">
                {/* overlay */}
                <div
                    onClick={closeModal}
                    aria-hidden="true"
                    className="fixed inset-0 w-full h-full bg-black/50 cursor-pointer"
                ></div>
                {/* Modal Content */}
                <div
                    className="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg shadow-lg relative max-h-[95vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()} // 👈 This prevents closing when clicking inside the modal
                >
                    {/* Close Button */}
                    <button
                        onClick={closeModal}
                        className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
                    >
                        &times;
                    </button>

                    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Add Teacher
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        action="#"
                        method="POST"
                        className="space-y-4"
                    >
                        {/* Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teacher Name
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="title"
                                name="teacherName"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Teacher Name..."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teacher Email
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="title"
                                name="teacherEmail"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Teacher Email..."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teacher Phone No.
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="title"
                                name="teacherPhoneNumber"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Teacher Phone no..."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teacher Expertise
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="title"
                                name="teacherExpertise"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Teacher Expertise ...."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teacher Salary
                            </label>
                            <input
                                onChange={handleChange}
                                type="text"
                                id="title"
                                name="teacherSalary"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type Teacher Salary ...."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="teacherSalary"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teacher Joined Date
                            </label>
                            <input
                                onChange={handleChange}
                                type="date"
                                id="teacherSalary"
                                name="teacherJoinedDate"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Teacher Joined date ..."
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="courseId"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teaching Course
                            </label>
                            <select
                                onChange={handleChange}
                                id="courseId"
                                name="courseId"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="" hidden>
                                    Select Course
                                </option>
                                {courses.length > 0 &&
                                    courses.map((item) => (
                                        <option key={item.courseId} value={item.courseId}>
                                            {item.courseName}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="title"
                                className="block font-semibold text-gray-700 mb-1"
                            >
                                Teacher Image
                            </label>
                            <input
                                onChange={handleChange}
                                type="file"
                                id="title"
                                name="teacherPhoto"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder=""
                            />
                        </div>


                        {/* Submit */}
                        <div className="text-center">
                            <button
                                disabled={loading}
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-blue-700 transition"
                            >
                                {loading ? "Creating..." : "Create Teacher"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Modal;
