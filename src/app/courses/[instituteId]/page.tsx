'use client'
import { fetchInstituteCourses } from "@/lib/store/course/courseSlice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";


function Course() {

    const params = useParams();
    const instituteId = params?.instituteId as string;

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchInstituteCourses(instituteId))
    }, [])

    return (
        <>
            {/* Courses Section */}
            <section id="portfolio" className="portfolio">
                <div className="container">
                    <h2>Our Courses</h2>
                    <div className="portfolio-grid">
                        <div className="portfolio-item">
                            <div className="portfolio-img">
                                <i className="fas fa-shopping-cart" />
                            </div>
                            <div className="portfolio-content">
                                <h3>E-Commerce Platform</h3>
                                <p>
                                    A full-featured online shopping solution with payment
                                    integration and inventory management.
                                </p>
                                <a href="#" className="btn btn-outline">
                                    View Details
                                </a>
                            </div>
                        </div>
                        <div className="portfolio-item">
                            <div className="portfolio-img">
                                <i className="fas fa-school" />
                            </div>
                            <div className="portfolio-content">
                                <h3>Learning Management System</h3>
                                <p>
                                    A comprehensive platform for online education with course
                                    management and student tracking.
                                </p>
                                <a href="#" className="btn btn-outline">
                                    View Details
                                </a>
                            </div>
                        </div>
                        <div className="portfolio-item">
                            <div className="portfolio-img">
                                <i className="fas fa-mobile-alt" />
                            </div>
                            <div className="portfolio-content">
                                <h3>Fitness Tracking App</h3>
                                <p>
                                    Mobile application for tracking workouts, nutrition, and
                                    health metrics with personalized plans.
                                </p>
                                <a href="#" className="btn btn-outline">
                                    View Details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Course;