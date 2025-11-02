"use client";

import { fetchChapters } from "@/lib/store/chapter/chapterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



function StudentCourseChapter() {
    const { chapters } = useAppSelector((store) => store.chapter)
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const instituteId = searchParams.get("instituteId");
    const { courseId } = useParams<{ courseId: string }>()
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState<string>("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return
        if (!courseId || !instituteId) return
        dispatch(fetchChapters(token, courseId, instituteId))
    }, [courseId, instituteId, dispatch])

    const filterChapters = chapters.filter((chapter) => chapter.chapterName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
        || chapter.id.toLocaleLowerCase().includes(searchTerm.toLowerCase()))


    return (
        <>
            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Kerala User Listing Table</title>
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold text-center mb-8">Chapters</h1>
                    {/* Search and Add User (Static) */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <div className="w-full md:w-1/3 mb-4 md:mb-0">
                            <input
                                onChange={(e) => setSearchTerm(e.target.value)}
                                type="text"
                                placeholder="Search users..."
                                className="w-full px-4 py-2 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* <a href="#" target="">
                            <button

                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                            >
                                + Add Chapter
                            </button>
                        </a> */}
                    </div>
                    {/* User Table */}
                    <div className="overflow-x-auto bg-white rounded-lg shadow">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">ID</th>
                                    <th className="py-3 px-6 text-left">ChapterName</th>
                                    <th className="py-3 px-6 text-left">Level</th>
                                    <th className="py-3 px-6 text-left">Duration</th>
                                    <th className="py-3 px-6 text-left">CreatedAt</th>
                                    <th className="py-3 px-6 text-left">UpdatedAt</th>
                                    <th className="py-3 px-6 text-left">Lessons</th>
                                    <th className="py-3 px-6 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm">
                                {filterChapters?.length > 0 &&
                                    filterChapters?.map((chapter) => {
                                        return (
                                            <tr
                                                key={chapter.id}
                                                className="border-b border-gray-200 hover:bg-gray-100"
                                            >
                                                <td className="py-3 px-6 text-left">
                                                    {chapter.id}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {chapter.chapterName}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {chapter.chapterLevel}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {chapter.chapterDuration}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {new Date(chapter.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-6 text-left">
                                                    {new Date(chapter.updatedAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <button
                                                        onClick={() => router.push(`/student/dashboard/courses/${courseId}/chapters/${chapter.id}/lessons?instituteId=${instituteId}`)}
                                                        className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            {/* 👇 Replace old path with these two */}
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                            />
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                                <td className="py-3 px-6 text-center">
                                                    <div className="flex item-center justify-center">
                                                        <button className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button

                                                            className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110"
                                                        >
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }) ||
                                    <tr>
                                        <td colSpan={9} className="py-3 px-6 text-center">
                                            Chapter empty !!!
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* Static Pagination */}
                    <div className="flex justify-between items-center mt-6">
                        <div>
                            <span className="text-sm text-gray-700">
                                Showing 1 to 5 of 5 entries
                            </span>
                        </div>
                        <div className="flex space-x-2">
                            <a href="https://abhirajk.vercel.app/" target="blank">
                                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50">
                                    Previous
                                </button>
                            </a>
                            <a href="https://abhirajk.vercel.app/" target="blank">
                                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 opacity-50">
                                    Next
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentCourseChapter;
