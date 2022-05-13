import React from "react";
import "./style/headerSection.scss";
import logo from "../../assets/images/logo.png";

export function HeaderSection() {
    return (
        <header className="hero-area">
            <div className="overlay">
                <span></span>
                <span></span>
            </div>
            <div className="navbar-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg">
                                <a className="navbar-brand" href="index.html">
                                    <img src={logo} alt="Logo" />
                                </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                    <span className="toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                    <ul id="nav" className="navbar-nav ml-auto">
                                        <li className="nav-item active">
                                            <a className="page-scroll" href="#home">Home</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="page-scroll" href="#services">Courses</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="page-scroll" href="#features">Contact Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="page-scroll" href="#showcase">Testimonial</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="page-scroll" href="#pricing">Result</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="page-scroll" href="#team">About Us</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="btn btn-singin" href="https://uideck.com/products/slick-free-bootstrap-template/" rel="nofollow">Start Now</a>
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
                                    <a href="https://uideck.com/products/slick-free-bootstrap-template/" rel="nofollow" className="btn btn-border-filled">Start Now</a>
                                    <a href="#contact" className="btn btn-border page-scroll">Contact Us</a>
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
    );
}
