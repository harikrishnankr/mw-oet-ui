import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import "./style/headerSection.scss";

interface IHeader {
    isSticky?: boolean;
    selectedId?: string;
}

export default function HeaderSection({ isSticky, selectedId }: IHeader) {

    const [isNavbarOpen, setNavbarOpen] = useState(false);

    const onHamburgerClick = () => {
        setNavbarOpen(o => !o);
    };

    const scrollTo = (hash: string) => {
        var position = (document.querySelector(hash) as HTMLElement).offsetTop - 100;
        document.querySelector('body')?.scrollTo({top: position, behavior: 'smooth' })
    };

    return (
        <div id="header">
            <header className="hero-area">
            <div className="overlay">
                <span></span>
                <span></span>
            </div>
            <div className={`navbar-area ${isSticky ? 'sticky menu-bg': ''}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <a className="navbar-brand" href="/">
                                    <img src={logo} alt="Logo" />
                                </a>
                                <button className={`navbar-toggler ${isNavbarOpen ? 'active' : ''}`} type="button" onClick={onHamburgerClick}>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>
                                <div className={`collapse navbar-collapse sub-menu-bar ${isNavbarOpen ? 'show': ''}`} id="navbarSupportedContent">
                                    <ul id="nav" className="navbar-nav ml-auto">
                                        <li className={`nav-item ${selectedId === "#home" ? 'active': ''}`} onClick={() => setNavbarOpen(false)}>
                                            <a className="page-scroll" onClick={() => scrollTo("#home")}>Home</a>
                                        </li>
                                        <li className={`nav-item ${selectedId === "#courses" ? 'active': ''}`} onClick={() => setNavbarOpen(false)}>
                                            <a className="page-scroll" onClick={() => scrollTo("#courses")}>Courses</a>
                                        </li>
                                        <li className={`nav-item ${selectedId === "#about-us" ? 'active': ''}`} onClick={() => setNavbarOpen(false)}>
                                            <a className="page-scroll" onClick={() => scrollTo("#about-us")}>About Us</a>
                                        </li>
                                        <li className={`nav-item ${selectedId === "#contact-us" ? 'active': ''}`} onClick={() => setNavbarOpen(false)}>
                                            <a className="page-scroll" onClick={() => scrollTo("#contact-us")}>Contact Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="page-scroll">Login</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="btn btn-singin" href="https://uideck.com/products/slick-free-bootstrap-template/" rel="nofollow">Register</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div id="home">
                <div className="container">
                    <div className="row space-100">
                        <div className="col-lg-6 col-md-12 col-xs-12">
                            <div className="contents">
                                <h2 className="head-title">
                                    A Lifetime of Confidence Starts Here<br className="d-none d-xl-block" />
                                </h2>
                                <p>
                                    Learn from the best tutors at the comfort of your home.
                                </p>
                                <div className="header-button">
                                    <a href="https://uideck.com/products/slick-free-bootstrap-template/" rel="nofollow" className="btn btn-border-filled">Register</a>
                                    <a href="#contact" className="btn btn-border page-scroll">
                                        Student Login
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-xs-12 p-0">
                            <div className="intro-img"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        </div>
    );
}
