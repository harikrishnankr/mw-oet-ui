import logo from "../../assets/images/logo-colored.png";
import airShipping from "../../assets/images/air-shipping.png";
import onlineAcademy from "../../assets/images/online-academy.png"

import "./ChoosePortal.scss";
import { useNavigate } from "react-router-dom";

export function ChoosePortal() {

    const navigation = useNavigate();

    const choose = (route: string) => {
        navigation(route);
    };

    return (
        <>
            <div className="container nav-logo">
                <div className="row">
                    <div className="col-lg-12">
                        <a className="navbar-brand" href="/">
                            <img src={logo} alt="Logo" />
                        </a>
                    </div>
                </div>
            </div>
            <div id="choose-portal">
                <div className="choose-portal-wrapper">
                    <h2 className="mb-3">Where do you want to go?</h2>
                    <div className="button-wrapper">
                        <button className="choose-portal-card study-abroad" onClick={() => choose("/study-abroad")}>
                            <div className="content">
                                <div className="portal-icon">
                                    <img src={airShipping} alt="Study Abroad"/>
                                </div>
                                <div className="portal-name">Study Abroad</div>
                            </div>
                        </button>
                        <button className="choose-portal-card online-academy" onClick={() => choose("/online-academy")}>
                            <div className="content">
                                <div className="portal-icon">
                                    <img src={onlineAcademy} alt="Online academy" />
                                </div>
                                <div className="portal-name">Online Academy</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <span className="copyright-outer">
                <p className="text-center">
                    © Copyright <a href="http://manglishworld.com/">Manglish World</a>. All Rights Reserved
                </p>
            </span>
        </>
    );
}
