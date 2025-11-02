"use client";
import "@/app/styles/home.css"
import { IDecodedToken } from "@/app/institute/institute.types";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartIcon from "../cart/Cart";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchCarts } from "@/lib/store/cart/cartSlice";

export default function HomePageLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const {items} = useAppSelector((store)=>store.cart)
    const dispatch = useAppDispatch()
    const [DecodedToken, setDToken] = useState<IDecodedToken>()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded: IDecodedToken = jwtDecode(token);
                setDToken(decoded)
            } catch (error) {
                console.log(error);
            }

            dispatch(fetchCarts(token))
        }


    }, []);

    const [isNavOpen, setNavOpen] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 1100) {
                setNavOpen(false); // Close nav on large screens
            }
        };
        // console.log(window.innerWidth,"size........")
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Load token from localStorage when component mounts

    // const [token, setToken] = useState<string | null>(null);
    // useEffect(() => {
    //   const value = localStorage.getItem("token");
    //   if (value) {
    //     setToken(value);
    //   }
    // }, []);
    //Handle logout
    const handleLogout = () => {
        localStorage.removeItem("token"); //delete from storage
        setDToken(undefined); //update state
        window.location.reload();
    };

    const handleOpenNewPage = () => {
        window.open("http://localhost:3001/auth/login", "_blank"); // opens in new tab
    };


    return (
        <>
            <div>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="description"
                    content="A Code Master Academy - Software Development & Training"
                />
                <meta
                    name="keywords"
                    content="coding, programming, web development, software, academy"
                />
                <meta name="author" content="Mfuranziza Dusabe Hamza" />
                <title>A Code Master Academy</title>
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
                />
                <style
                    dangerouslySetInnerHTML={{
                        __html:
                            "\n    /* Base Styles */\n    :root {\n      --primary: #2563eb;\n      --primary-dark: #1d4ed8;\n      --secondary: #8b5cf6;\n      --dark: #1e293b;\n      --light: #f8fafc;\n      --gray: #94a3b8;\n      --success: #10b981;\n    }\n    \n    * {\n      margin: 0;\n      padding: 0;\n      box-sizing: border-box;\n    }\n    \n    body {\n      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n      background-color: var(--light);\n      color: var(--dark);\n      line-height: 1.6;\n      overflow-x: hidden;\n    }\n    \n    .container {\n      max-width: 1200px;\n      margin: 0 auto;\n      padding: 0 20px;\n    }\n    \n    section {\n      padding: 80px 0;\n    }\n    \n    h1, h2, h3, h4 {\n      font-weight: 700;\n      line-height: 1.2;\n    }\n    \n    h1 {\n      font-size: 3.5rem;\n      margin-bottom: 20px;\n    }\n    \n    h2 {\n      font-size: 2.5rem;\n      margin-bottom: 40px;\n      text-align: center;\n      position: relative;\n    }\n    \n    h2::after {\n      content: '';\n      position: absolute;\n      bottom: -15px;\n      left: 50%;\n      transform: translateX(-50%);\n      width: 80px;\n      height: 4px;\n      background: var(--primary);\n      border-radius: 2px;\n    }\n    \n    h3 {\n      font-size: 1.8rem;\n      margin-bottom: 15px;\n    }\n    \n    p {\n      margin-bottom: 20px;\n      font-size: 1.1rem;\n    }\n    \n    a {\n      text-decoration: none;\n      color: var(--primary);\n      transition: all 0.3s ease;\n    }\n    \n    a:hover {\n      color: var(--primary-dark);\n    }\n    \n    .btn {\n    font-size: 18px;\n  display: inline-block;\n      padding: 8px 15px;\n      background: var(--primary);\n      color: white;\n      border-radius: 30px;\n      font-weight: 600;\n           letter-spacing: 1px;\n      transition: all 0.3s ease;\n      border: none;\n      cursor: pointer;\n      position: relative;\n      overflow: hidden;\n    }\n    \n    .btn:hover {\n      background: var(--primary-dark);\n      transform: translateY(-3px);\n      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);\n    }\n    \n    .btn-outline {\n      background: transparent;\n      border: 2px solid var(--primary);\n      color: var(--primary);\n    }\n    \n    .btn-outline:hover {\n      background: var(--primary);\n      color: white;\n    }\n    \n    /* Header Styles */\n    header {\n      position: fixed;\n      top: 0;\n      left: 0;\n      width: 100%;\n      background: rgba(255, 255, 255, 0.95);\n      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n      z-index: 1000;\n      padding: 15px 0;\n      transition: all 0.3s ease;\n    }\n    \n    .header-container {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n    }\n    \n    .logo {\n      display: flex;\n      align-items: center;\n    }\n    \n    .logo img {\n      height: 50px;\n      margin-right: 15px;\n    }\n    \n    .logo-text {\n      font-size: 1.8rem;\n      font-weight: 800;\n      color: var(--primary);\n    }\n    \n    .logo-text span {\n      color: var(--secondary);\n    }\n    \n    nav ul {\n      display: flex;\n      list-style: none;\n    }\n    \n    nav ul li {\n      margin-left: 30px;\n    }\n    \n    nav ul li a {\n      color: var(--dark);\n      font-weight: 600;\n      position: relative;\n    }\n    \n    nav ul li a::after {\n      content: '';\n      position: absolute;\n      bottom: -5px;\n      left: 0;\n      width: 0;\n      height: 2px;\n      background: var(--primary);\n      transition: width 0.3s ease;\n    }\n    \n    nav ul li a:hover::after,\n    nav ul li a.active::after {\n      width: 100%;\n    }\n    \n    .mobile-toggle {\n      display: none;\n      font-size: 1.5rem;\n      cursor: pointer;\n    }\n    \n    /* Hero Section */\n    .hero {\n      height: 100vh;\n      display: flex;\n      align-items: center;\n      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);\n      position: relative;\n      overflow: hidden;\n    }\n    \n    .hero::before {\n      content: '';\n      position: absolute;\n      top: -50%;\n      right: -30%;\n      width: 800px;\n      height: 800px;\n      border-radius: 50%;\n      background: linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);\n      z-index: -1;\n    }\n    \n    .hero-content {\n      max-width: 600px;\n    }\n    \n    .hero h1 span {\n      color: var(--secondary);\n    }\n    \n    .hero-btns {\n      margin-top: 30px;\n      display: flex;\n      gap: 15px;\n    }\n    \n    .hero-image {\n      position: absolute;\n      right: 0;\n      top: 50%;\n      transform: translateY(-50%);\n      width: 45%;\n      max-width: 600px;\n      animation: float 5s ease-in-out infinite;\n    }\n    \n    @keyframes float {\n      0% {\n        transform: translateY(-50%);\n      }\n      50% {\n        transform: translateY(-53%);\n      }\n      100% {\n        transform: translateY(-50%);\n      }\n    }\n    \n    /* Services Section */\n    .services-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n      gap: 30px;\n      margin-top: 50px;\n    }\n    \n    .service-card {\n      background: white;\n      border-radius: 10px;\n      overflow: hidden;\n      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);\n      transition: all 0.3s ease;\n      text-align: center;\n      padding: 40px 30px;\n    }\n    \n    .service-card:hover {\n      transform: translateY(-10px);\n      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);\n    }\n    \n    .service-icon {\n      font-size: 3rem;\n      color: var(--primary);\n      margin-bottom: 20px;\n    }\n    \n    /* Portfolio Section */\n    .portfolio {\n      background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);\n    }\n    \n    .portfolio-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n      gap: 30px;\n    }\n    \n    .portfolio-item {\n      background: white;\n      border-radius: 10px;\n      overflow: hidden;\n      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);\n      transition: all 0.3s ease;\n    }\n    \n    .portfolio-item:hover {\n      transform: translateY(-10px);\n      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);\n    }\n    \n    .portfolio-img {\n      height: 250px;\n      background: linear-gradient(135deg, var(--primary), var(--secondary));\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      color: white;\n      font-size: 3rem;\n    }\n    \n    .portfolio-content {\n      padding: 25px;\n    }\n    \n    /* About Section */\n    .about-content {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 50px;\n      align-items: center;\n    }\n    \n    .about-image {\n      border-radius: 10px;\n      overflow: hidden;\n      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);\n    }\n    \n    .about-image img {\n      width: 100%;\n      height: auto;\n      display: block;\n    }\n    \n    .skills {\n      margin-top: 30px;\n    }\n    \n    .skill-bar {\n      margin-bottom: 20px;\n    }\n    \n    .skill-info {\n      display: flex;\n      justify-content: space-between;\n      margin-bottom: 5px;\n    }\n    \n    .skill-progress {\n      height: 8px;\n      background: #e2e8f0;\n      border-radius: 4px;\n      overflow: hidden;\n    }\n    \n    .skill-progress span {\n      display: block;\n      height: 100%;\n      background: var(--primary);\n      border-radius: 4px;\n    }\n    \n    /* Contact Section */\n    .contact {\n      background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%);\n    }\n    \n    .contact-container {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 50px;\n    }\n    \n    .contact-info {\n      display: flex;\n      flex-direction: column;\n      gap: 25px;\n    }\n    \n    .contact-item {\n      display: flex;\n      gap: 15px;\n    }\n    \n    .contact-icon {\n      font-size: 1.5rem;\n      color: var(--primary);\n      min-width: 40px;\n    }\n    \n    .contact-form {\n      background: white;\n      padding: 40px;\n      border-radius: 10px;\n      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);\n    }\n    \n    .form-group {\n      margin-bottom: 20px;\n    }\n    \n    .form-group label {\n      display: block;\n      margin-bottom: 8px;\n      font-weight: 600;\n    }\n    \n    .form-group input,\n    .form-group textarea,\n    .form-group select {\n      width: 100%;\n      padding: 12px 15px;\n      border: 1px solid #cbd5e1;\n      border-radius: 5px;\n      font-family: inherit;\n      font-size: 1rem;\n      transition: all 0.3s ease;\n    }\n    \n    .form-group input:focus,\n    .form-group textarea:focus,\n    .form-group select:focus {\n      border-color: var(--primary);\n      outline: none;\n      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);\n    }\n    \n    .form-group textarea {\n      min-height: 150px;\n      resize: vertical;\n    }\n    \n    .services-options {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 15px;\n      margin-bottom: 20px;\n    }\n    \n    .service-option {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n    }\n    \n    /* Footer */\n    footer {\n      background: var(--dark);\n      color: white;\n      padding: 60px 0 30px;\n    }\n    \n    .footer-grid {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n      gap: 40px;\n      margin-bottom: 40px;\n    }\n    \n    .footer-logo {\n      font-size: 1.8rem;\n      font-weight: 800;\n      margin-bottom: 15px;\n      color: white;\n    }\n    \n    .footer-logo span {\n      color: var(--secondary);\n    }\n    \n    .footer-links h3 {\n      color: white;\n      margin-bottom: 20px;\n      font-size: 1.3rem;\n    }\n    \n    .footer-links ul {\n      list-style: none;\n    }\n    \n    .footer-links ul li {\n      margin-bottom: 10px;\n    }\n    \n    .footer-links ul li a {\n      color: var(--gray);\n      transition: all 0.3s ease;\n    }\n    \n    .footer-links ul li a:hover {\n      color: white;\n    }\n    \n    .social-links {\n      display: flex;\n      gap: 15px;\n      margin-top: 20px;\n    }\n    \n    .social-links a {\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      width: 40px;\n      height: 40px;\n      background: rgba(255, 255, 255, 0.1);\n      color: white;\n      border-radius: 50%;\n      transition: all 0.3s ease;\n    }\n    \n    .social-links a:hover {\n      background: var(--primary);\n      transform: translateY(-5px);\n    }\n    \n    .copyright {\n      text-align: center;\n      padding-top: 30px;\n      border-top: 1px solid rgba(255, 255, 255, 0.1);\n      color: var(--gray);\n      font-size: 0.9rem;\n    }\n    \n    /* Responsive Styles */\n    @media (max-width: 992px) {\n      h1 {\n        font-size: 2.8rem;\n      }\n      \n      h2 {\n        font-size: 2.2rem;\n      }\n      \n      .about-content,\n      .contact-container {\n        grid-template-columns: 1fr;\n      }\n      \n      .about-image {\n        max-width: 500px;\n        margin: 0 auto;\n      }\n      \n      .hero-image {\n        display: none;\n      }\n      \n      .hero-content {\n        max-width: 100%;\n        text-align: center;\n      }\n      \n      .hero-btns {\n        justify-content: center;\n      }\n    }\n    \n    @media (max-width: 768px) {\n      nav {\n        position: fixed;\n        top: 80px;\n        right: -100%;\n        width: 80%;\n        height: calc(100vh - 80px);\n        background: white;\n        box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);\n        transition: all 0.4s ease;\n      }\n      \n      nav.active {\n        right: 0;\n      }\n      \n      nav ul {\n        flex-direction: column;\n        padding: 30px;\n      }\n      \n      nav ul li {\n        margin: 0 0 20px 0;\n      }\n      \n      .mobile-toggle {\n        display: block;\n      }\n      \n      .services-options {\n        grid-template-columns: 1fr;\n      }\n    }\n    \n    @media (max-width: 576px) {\n      section {\n        padding: 60px 0;\n      }\n      \n      h1 {\n        font-size: 2.2rem;\n      }\n      \n      h2 {\n        font-size: 1.8rem;\n      }\n      \n      .btn {\n        padding: 10px 20px;\n        font-size: 0.9rem;\n      }\n      \n      .hero-btns {\n        flex-direction: column;\n        align-items: center;\n      }\n      \n      .contact-form {\n        padding: 25px;\n      }\n    }\n  ",
                    }}
                />
                {/* Header */}
                <header style={{ display: "flex", justifyContent: "space-between" }}>
                    <div
                        className="container header-container"
                        style={{ display: "flex", justifyContent: "space-evenly" }}
                        id="nav-vertical"
                    >
                        <Link href="/" className="logo">
                            <div className="logo-text">
                                <span style={{fontSize:"31px"}}>e</span>-Learning<span>Space</span>
                            </div>
                        </Link>

                        {/* Nav */}
                        <nav className={isNavOpen ? "active" : ""}>
                            <ul onClick={() => setNavOpen(false)} className="navbar">
                                <li>
                                    <a href="#home" className="text-[18px]">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#services" className="text-[18px]">
                                        Institutes
                                    </a>
                                </li>
                                <li>
                                    <a href="#portfolio" className="text-[18px]">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="#about" className="text-[18px]">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-[18px]">
                                        Contact
                                    </a>
                                </li>

                            </ul>
                        </nav>
                        {/* nav button bar */}
                        <span className="nav-search" id="nav-subvertical" >
                            <Link href={``}>
                                <button type="submit" className="btn">
                                    Student
                                </button>
                            </Link>
                            <Link href="">
                                <button type="submit" className="btn" onClick={handleOpenNewPage} >
                                    Teacher
                                </button>
                            </Link>
                            {DecodedToken ? (
                                <button onClick={handleLogout} className="btn" id="btn">
                                    Logout
                                </button>
                            ) : (
                                <Link href="/auth/login" >
                                    <button type="submit" className="btn" >
                                        Login
                                    </button>
                                </Link>
                            )}
                            <CartIcon itemCount={items.length} />
                        </span>

                    </div>
                    {/* Mobile Toggle Button */}
                    <div
                        className="mobile-toggle" style={{ paddingRight: "3px" }}
                        onClick={() => setNavOpen(!isNavOpen)}
                    >
                        <i className="fas fa-bars" />
                    </div>
                </header>
                {/* Institutes' Courses  */}
                {children}
                {/* Footer */}
                <footer>
                    <div className="container">
                        <div className="footer-grid">
                            <div className="footer-about">
                                <div className="footer-logo">
                                   <span style={{fontSize:"31px"}}>e</span>-Learning<span>Space</span>
                                </div>
                                <p>
                                    Transforming businesses and empowering developers through
                                    innovative software solutions and comprehensive training
                                    programs.
                                </p>
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
                            <div className="footer-links">
                                <h3>Quick Links</h3>
                                <ul>
                                    <li>
                                        <a href="#home">Home</a>
                                    </li>
                                    <li>
                                        <a href="#services">Services</a>
                                    </li>
                                    <li>
                                        <a href="#portfolio">Portfolio</a>
                                    </li>
                                    <li>
                                        <a href="#about">About Us</a>
                                    </li>
                                    <li>
                                        <a href="#contact">Contact</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-links">
                                <h3>Our Services</h3>
                                <ul>
                                    <li>
                                        <a href="#">Software Development</a>
                                    </li>
                                    <li>
                                        <a href="#">Web Design</a>
                                    </li>
                                    <li>
                                        <a href="#">Mobile App Development</a>
                                    </li>
                                    <li>
                                        <a href="#">UI/UX Design</a>
                                    </li>
                                    <li>
                                        <a href="#">Training &amp; Mentorship</a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-links">
                                <h3>Contact Info</h3>
                                <ul>
                                    <li>
                                        <i className="fas fa-map-marker-alt" /> Tulsipur, Dang
                                    </li>
                                    <li>
                                        <i className="fas fa-envelope" />{" "}
                                        e-learningSpace@gmail.com
                                    </li>
                                    <li>
                                        <i className="fas fa-phone" /> 9864660603
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="copyright">
                            <p>
                                © 2025 e-LearningSpace. All Rights Reserved. Created by Arjun
                                Kumar Pun
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
