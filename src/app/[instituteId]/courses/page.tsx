'use client'
import { fetchInstituteCourses } from "@/lib/store/course/courseSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";


function Course() {

    const params = useParams();
    const instituteId = params?.instituteId as string;
    const { courses } = useAppSelector((store) => store.course)

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchInstituteCourses(instituteId))
    }, [])

    return (
        <>
            {/* Courses Section */}
            <section id="portfolio" className="portfolio">
                <div className="container" style={{ paddingTop: "70px" }}>
                    <h2>Our Courses</h2>
                    <div className="portfolio-grid">
                        {
                            courses.length > 0 && courses.map((course) => {
                                return (
                                    <div key={course.courseId} className="portfolio-item">
                                        <div className="portfolio-img">
                                            <img className="w-full h-full object-cover" src={courses[0]?.courseThumbnail} alt="Product Image" />
                                        </div>
                                        <div className="portfolio-content">
                                            <h3>{course.courseName}</h3>
                                            <p>
                                                {course.courseDescription}
                                            </p>
                                            <Link href={`/${instituteId}/courses/${course.courseId}`} className="btn btn-outline">
                                                View Course Details
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        }


                    </div>
                </div>
            </section>
        </>
    );
}

export default Course;