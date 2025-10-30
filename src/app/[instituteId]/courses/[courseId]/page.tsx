'use client'
import { addCart, resetStatus } from "@/lib/store/cart/cartSlice";
import { ICart } from "@/lib/store/cart/cartSlice.types";
import { fetchInstituteCourse } from "@/lib/store/course/courseSlice";
import { Status } from "@/lib/store/global/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./components/modal/Modal";

const CourseDetail = () => {
    const params = useParams();
    const instituteId = params?.instituteId as string;
    const courseId = params?.courseId as string;
    const { courses } = useAppSelector((store) => store.course)
    const { status } = useAppSelector((store) => store.cart)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const [data, setData] = useState<ICart>({
        courseId: "",
        instituteId: ""
    })
    console.log(data, "testDAta....")


    useEffect(() => {

        if (courseId && instituteId) {
            setData({ courseId, instituteId });
            dispatch(fetchInstituteCourse(instituteId, courseId))
        }

    }, [courseId, instituteId, dispatch]);


    const handleClick = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setModalMessage("Please ! log in first");
            setIsModalOpen(true);
            return
        };

        dispatch(addCart(token, data));
        setModalMessage("Course added to cart successfully!");
        setIsModalOpen(true);
    };

    const handleClickBuy = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setModalMessage("Please ! login first");
            setIsModalOpen(true);
            return
        };
        router.replace(`/order/checkout?instituteId=${instituteId}&courseId=${courseId}`);
    }

    useEffect(() => {
        if (status === Status.Success) {
            dispatch(resetStatus())

        }
    }, [status])



    return (
        <>
            {/* Course Details */}
            <section id="portfolio" className="portfolio">
                <div className="container" style={{ paddingTop: "60px" }}>
                    {isModalOpen && (
                        <Modal onClose={() => setIsModalOpen(false)}>
                            <p className="text-lg font-semibold mb-2">{modalMessage}</p>
                        </Modal>
                    )}
                    <h2>Course Details</h2>
                    <div className="portfolio-grid">
                        <div className="bg-gray-100 dark:bg-gray-800 py-8">
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex flex-col md:flex-row -mx-4">
                                    <div className="md:flex-1 px-4">
                                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                                            <img className="w-full h-full object-cover" src={courses[0]?.courseThumbnail} alt="Product Image" />
                                        </div>
                                        <div className="flex -mx-2 mb-4" style={{ paddingTop: "12px", marginTop: "14px" }}>
                                            <div className="w-1/2 px-2" style={{ marginRight: "12px" }}>
                                                <button onClick={handleClickBuy} style={{ padding: "5px" }} className="w-full bg-blue-700 dark:bg-blue-400 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600 dark:hover:bg-blue-500">Buy Now</button>
                                            </div>
                                            <div className="w-1/2 px-2" style={{ marginRight: "12px" }}>
                                                <button onClick={handleClick} style={{ padding: "5px" }} className="w-full bg-orange-700 dark:bg-orange-400 text-white py-2 px-4 rounded-full font-bold hover:bg-orange-600 dark:hover:bg-orange-500">Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:flex-1 px-4" style={{ padding: "0px 12px ", margin: " 0px 12px" }}>
                                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{courses[0]?.courseName}</h2>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                            {courses[0]?.categoryDescription}
                                        </p>
                                        <div className="flex mb-4">
                                            <div className="mr-4" style={{ marginRight: "16px" }}>
                                                <span className="font-bold text-gray-700 dark:text-gray-300">Fee: </span>
                                                <span className="text-gray-600 dark:text-gray-300">{courses[0]?.coursePrice}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700 dark:text-gray-300">Duration: </span>
                                                <span className="text-gray-600 dark:text-gray-300">{courses[0]?.courseDuration}</span>
                                            </div>
                                        </div>
                                        <div className="flex mb-4">
                                            <div className="mr-4" style={{ marginRight: "16px" }}>
                                                <span className="font-bold text-gray-700 dark:text-gray-300">Teacher: </span>
                                                <span className="text-gray-600 dark:text-gray-300">{courses[0]?.teacherName}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-gray-700 dark:text-gray-300">Level: </span>
                                                <span className="text-gray-600 dark:text-gray-300">{courses[0]?.courseLevel}</span>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Category: </span>
                                            <span className="text-gray-600 dark:text-gray-300">{courses[0]?.categoryName}</span>
                                        </div>

                                        <div>
                                            <span className="font-bold text-gray-700 dark:text-gray-300">Description:</span>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                                {courses[0]?.courseDescription}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    );
}

export default CourseDetail;