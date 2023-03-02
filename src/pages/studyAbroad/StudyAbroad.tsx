import logo from "../../assets/images/logo-colored.png";
import comingSoon from "../../assets/images/coming-soon.png";
import "./StudyAbroad.scss";

export function StudyAbroad() {
    return (
        <div id="study-abroad">
            <div className="container nav-logo">
                <div className="row">
                    <div className="col-lg-12">
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="Logo" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="container cs-wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="coming-soon-img">
                            <img src={comingSoon} alt="Coming Soon..." />
                        </div>
                        <div className="coming-soon-text mt-4">
                            <div className="sa">ManglishWorld Study Abroad</div>
                            <div className="cs">We are Coming Soon...</div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="copyright-outer">
                <p className="text-center">
                    © Copyright <a href="http://manglishworld.com/">Manglish World</a>. All Rights Reserved
                </p>
            </span>
        </div>
    );
}
