"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./styles/home.css";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { IDecodedToken } from "./institute/institute.types";
import { jwtDecode } from "jwt-decode";
import { getInstitutes } from "@/lib/store/institute/instituteSlice";
import HomePageLayout from "@/components/homepagelayout/HomePageLayout";

function Home() {
  // const { role } = useAppSelector((store) => store.auth.user);
  const { institutes } = useAppSelector((store) => store.institute)
  const [DecodedToken, setDToken] = useState<IDecodedToken>()
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getInstitutes())
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: IDecodedToken = jwtDecode(token);
        setDToken(decoded)
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  return (
    <>
      <HomePageLayout>
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-content">
              <h1>
                Launch your <span>Online Educational Institute</span> within few
                minutes.
              </h1>
              <p>
                Build a LMS website, manage your all digital study contents and
                deliver all over Nepal through Our DigitalPathshala Platform
              </p>
              <div className="hero-btns">
                <a href="#services" className="btn">
                  Let&apos;s enroll Our Courses
                </a>
                <a href="#portfolio" className="btn btn-outline">
                  Our Projects
                </a>
              </div>
            </div>
            <div
              className="hero-content"
              style={{ margin: "14px 0px 8px 0px" }}
            >
              {DecodedToken?.role === "visitor" ? (
                <Link href={"/institute"}>
                  <div className="btn btn-outline">
                    Click! here to Create Institute
                  </div>
                </Link>
              ) : DecodedToken?.role === "institute" ? (
                <Link href="/institute/dashboard" className="btn btn-outline">
                  Go to the Institute Dashboard
                </Link>
              ) : DecodedToken?.role === "student" ? (
                <Link href="/student/dashboard" className="btn btn-outline">
                  Go to the Student Dashboard
                </Link>
              ) :
                (
                  <Link href={"/auth/register"}>
                    <div className="btn btn-outline">
                      Please! Signup to Create Institute / to enroll Courses
                    </div>
                  </Link>
                )}
            </div>
            {/* <div className="hero-content">
              {(role === "institute" || DecodedToken?.role === "institute") && (<Link href="/institute/dashboard" className="btn btn-outline">
                Go to the Institute
              </Link>)}
            </div> */}
          </div>
          <div className="hero-image">
            <div className="flex items-center justify-center ">
              <Image
                src="/image/heros.jpeg" // Path to your image in the public folder
                alt="My Photo"
                width={775} // Desired width
                height={0} // Desired height
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
        {/* Services Section */}
        <section id="services" className="services">
          <div className="container">
            <h2>Our Joined Institutes</h2>
            <div className="services-grid">
              {                             //OUR JOINED INSTITUTES
                institutes.length > 0 && institutes.map((institute) => {
                  return (
                    // <Link href={`/courses`} >
                    <div key={institute.id} className="service-card">
                      <div className="service-icon">
                        <i className="fas fa-laptop-code" />
                      </div>
                      <h3>{institute.instituteName}</h3>
                      <p>
                        Custom software solutions tailored to your business needs,
                        built with modern technologies and best practices.
                      </p>
                      <p>Mobile no: {institute.institutePhoneNumber}</p>
                      <Link href={`/${institute.instituteNumber}/courses`}>
                        <button type="submit" className="btn">
                          View Courses
                        </button>
                      </Link>
                    </div>
                    // </Link>
                  )
                })
              }
            </div>
          </div>
        </section>
        {/* Portfolio Section */}
        <section id="portfolio" className="portfolio">
          <div className="container">
            <h2>Featured Projects</h2>
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
        {/* About Section */}
        <section id="about" className="about">
          <div className="container">
            <h2>About Us</h2>
            <div className="about-content">
              <div className="about-text">
                <h3>We&apos;re Passionate About Technology</h3>
                <p>
                  A Code Master Academy was founded by Mfuranziza Dusabe Hamza
                  with a mission to bridge the gap between technology education
                  and industry needs. We believe in empowering individuals and
                  businesses through innovative software solutions and
                  comprehensive training.
                </p>
                <p>
                  Our team of experienced developers, designers, and educators
                  are dedicated to delivering exceptional results and helping
                  our clients achieve their digital transformation goals.
                </p>
                <div className="skills">
                  <div className="skill-bar">
                    <div className="skill-info">
                      <span>Web Development</span>
                      <span>95%</span>
                    </div>
                    <div className="skill-progress">
                      <span style={{ width: "95%" }} />
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-info">
                      <span>Mobile Development</span>
                      <span>90%</span>
                    </div>
                    <div className="skill-progress">
                      <span style={{ width: "90%" }} />
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-info">
                      <span>UI/UX Design</span>
                      <span>85%</span>
                    </div>
                    <div className="skill-progress">
                      <span style={{ width: "85%" }} />
                    </div>
                  </div>
                  <div className="skill-bar">
                    <div className="skill-info">
                      <span>Cloud Solutions</span>
                      <span>80%</span>
                    </div>
                    <div className="skill-progress">
                      <span style={{ width: "80%" }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-image">
                <div
                  style={{
                    background: "linear-gradient(135deg, #8b5cf6, #2563eb)",
                    width: "100%",
                    height: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    padding: 20,
                    textAlign: "center",
                  }}
                >
                  Empowering Developers, Transforming Businesses
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contact" className="contact">
          <div className="container">
            <h2>Contact Us</h2>
            <div className="contact-container">
              <div className="contact-info">
                <h3>Get In Touch</h3>
                <p>
                  Have a project in mind or want to learn more about our
                  training programs? Reach out to us!
                </p>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt" />
                  </div>
                  <div>
                    <h4>Location</h4>
                    <p>Rubavu, Rwanda</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope" />
                  </div>
                  <div>
                    <h4>Email</h4>
                    <p>mfuranzizahamza@gmail.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-phone" />
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <p>+250 796 132 866</p>
                  </div>
                </div>
                <div className="social-links">
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="#">
                    <i className="fab fa-github" />
                  </a>
                </div>
              </div>
              <div className="contact-form">
                <h3 id="hire">Hire Us</h3>
                <form className="work-request">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="services">Services Needed</label>
                    <div className="services-options">
                      <div className="service-option">
                        <input type="checkbox" id="service1" />
                        <label htmlFor="service1">Software Development</label>
                      </div>
                      <div className="service-option">
                        <input type="checkbox" id="service2" />
                        <label htmlFor="service2">UI/UX Design</label>
                      </div>
                      <div className="service-option">
                        <input type="checkbox" id="service3" />
                        <label htmlFor="service3">Mobile App</label>
                      </div>
                      <div className="service-option">
                        <input type="checkbox" id="service4" />
                        <label htmlFor="service4">Web Development</label>
                      </div>
                      <div className="service-option">
                        <input type="checkbox" id="service5" />
                        <label htmlFor="service5">Training</label>
                      </div>
                      <div className="service-option">
                        <input type="checkbox" id="service6" />
                        <label htmlFor="service6">Other</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Project Details</label>
                    <textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      defaultValue={""}
                    />
                  </div>
                  <button type="submit" className="btn">
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </HomePageLayout>
    </>
  );
}

export default Home;
