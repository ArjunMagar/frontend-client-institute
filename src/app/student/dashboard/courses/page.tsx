"use client";
import { fetchStudentCourses } from "@/lib/store/course/courseSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";



export default function StudentCourses() {
  const { courses } = useAppSelector((store) => store.course)
  const dispatch = useAppDispatch()
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return;

    dispatch(fetchStudentCourses(token))
  }, [])

  const goToChapters = (courseId: string, instituteId: string) => {
    router.push(`/student/dashboard/courses/${courseId}/chapters?instituteId=${instituteId}`)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-10">
        Enrolled Courses
      </h2>

      <div
        className="
          grid
          grid-cols-1
          [@media(max-width:720px)]:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
        "
      >
        {courses.map((course) => (
          <div
            key={course.enrollmentId}
            className="
              bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg 
              transition transform hover:-translate-y-2
            "
          >
            <div className="h-52 sm:h-60 overflow-hidden">
              <img
                src={course.courseThumbnail}
                alt='img'
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{course.courseName}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.courseDescription}</p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">
                  Rs: {course.coursePrice}
                </span>
                <button
                  onClick={() => goToChapters(course.courseId, course.instituteId)}
                  className="
                    bg-blue-800 text-white text-sm px-4 py-2 rounded-md 
                    hover:bg-blue-900 hover:scale-105 transition-transform duration-500
                    
                  "
                >
                  View Chapters
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
