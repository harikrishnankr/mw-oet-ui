import { ReactNode, SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import logoColored from "../../assets/images/logo-colored.png";
import "./headerLight.scss";

interface IHeaderLight {
    children?: ReactNode;
}

export function HeaderLight(props: IHeaderLight) {
    const navigation = useNavigate();

    const goHome = (e: SyntheticEvent) => {
        e.preventDefault();
        navigation("/");
    };

    return (
        <>
            <div className="Header__wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="Header">
                                <a className="Header__logo" href="/">
                                    <img src={logoColored} alt="Logo" />
                                </a>
                                <div className="Header__actions">
                                    <ul className="ml-auto">
                                        <li>
                                            <button className="Header__back" onClick={goHome}>Back To Home</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Content__wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">{props.children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
