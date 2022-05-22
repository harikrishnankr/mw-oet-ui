import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/images/logo.png";
import { ChooseUserType } from "../../core/chooseUserType/ChooseUserType";
import "./style/headerSection.scss";

interface IHeader {
    isSticky?: boolean;
    selectedId?: string;
}

export default function HeaderSection({ isSticky, selectedId }: IHeader) {

    const [isNavbarOpen, setNavbarOpen] = useState(false);
    const [toggleChooseUser, setToggleChooseUser] = useState(false);
    const navigate = useNavigate();

    const onHamburgerClick = () => {
        setNavbarOpen(o => !o);
    };

    const scrollTo = (hash: string) => (event: SyntheticEvent) => {
        event.preventDefault();
        var position = (document.querySelector(hash) as HTMLElement).offsetTop - 100;
        document.querySelector('body')?.scrollTo({ top: position, behavior: 'smooth' })
    };

    const navigateToRegister = (e: SyntheticEvent) => {
        e.preventDefault();
        navigate("/student/register");
    };

    const navigateToLogin = (e: SyntheticEvent) => {
        e.preventDefault();
        navigate("/student/login");
    };

    const openChooseUserType = (e: SyntheticEvent) => {
        e.preventDefault();
        setToggleChooseUser(true);
    };

    return (
        <div id="header">
            <header className="hero-area">
                <div className="overlay">
                    <span></span>
                    <span></span>
                </div>
                <div className={`navbar-area ${isSticky ? 'sticky menu-bg' : ''}`}>
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
                                    <div className={`collapse navbar-collapse sub-menu-bar ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
                                        <ul id="nav" className="navbar-nav ml-auto">
                                            <li className={`nav-item ${selectedId === "#home" ? 'active' : ''}`} onClick={() => setNavbarOpen(false)}>
                                                <a className="page-scroll" href="/#/" onClick={scrollTo("#home")}>Home</a>
                                            </li>
                                            <li className={`nav-item ${selectedId === "#courses" ? 'active' : ''}`} onClick={() => setNavbarOpen(false)}>
                                                <a className="page-scroll" href="/#/" onClick={scrollTo("#courses")}>Courses</a>
                                            </li>
                                            <li className={`nav-item ${selectedId === "#about-us" ? 'active' : ''}`} onClick={() => setNavbarOpen(false)}>
                                                <a className="page-scroll" href="/#/" onClick={scrollTo("#about-us")}>About Us</a>
                                            </li>
                                            <li className={`nav-item ${selectedId === "#contact-us" ? 'active' : ''}`} onClick={() => setNavbarOpen(false)}>
                                                <a className="page-scroll" href="/#/" onClick={scrollTo("#contact-us")}>Contact Us</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="page-scroll" onClick={openChooseUserType} href="/#/">Login</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="btn btn-singin" onClick={navigateToRegister} href="/#/" rel="nofollow">Register</a>
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
                                        <a onClick={navigateToRegister} href="/#/" rel="nofollow" className="btn btn-border-filled">Register</a>
                                        <a onClick={navigateToLogin} href="/#/" className="btn btn-border page-scroll">
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
            <ChooseUserType isOpen={toggleChooseUser} accept={() => setToggleChooseUser(false)} decline={() => setToggleChooseUser(false)} />
        </div>
    );
}
