"use client"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchLesson } from "@/lib/store/lesson/lessonSlice";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const StudentLesson = () => {
    const { lessons } = useAppSelector((store) => store.lesson)
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const instituteId = searchParams.get("instituteId");
    const { lessonId } = useParams<{ lessonId: string }>()
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return;
        if (!instituteId || !lessonId) return;
        dispatch(fetchLesson(token, lessonId, instituteId))
    }, [])

    return (
        <>
            {
                lessons?.length > 0 && (
                    <div className="flex flex-col items-start justify-start min-h-screen bg-gray-50 ">
                        <h1 className="text-2xl font-bold">{lessons[0]?.lessonName}</h1>
                           <h1 className="text-1xl font-bold mb-6">{lessons[0]?.lessonDescription}</h1>

                        <div className="w-full max-w-3xl aspect-video">
                            <iframe
                                width="150%"
                                height="130%"
                                src={lessons[0]?.lessonVideoUrl}
                                title="Node.js Tutorial - Classes in Node.js"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-lg shadow-lg"
                            ></iframe>
                        </div>
                        
                    </div>
                )
            }
        </>
    );
}

export default StudentLesson;