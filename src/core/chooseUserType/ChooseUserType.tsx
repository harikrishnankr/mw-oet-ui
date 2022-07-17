import { Modal } from "antd";
import React, { SyntheticEvent, useState } from "react";
import { UserType } from "../constants/common";
import "./chooseUserType.scss";

import Student from "../../assets/images/student.svg";
import Teacher from "../../assets/images/teacher.png";
import Office from "../../assets/images/office.png";
import { useNavigate } from "react-router";

export function ChooseUserType({isOpen, accept, decline}: { isOpen: boolean; accept: () => any; decline: () => any;}) {
    const [userType, setUserType] = useState(UserType.Student);
    const navigate = useNavigate();

    const onAccept = () => {
        accept();
        navigate(`${userType === UserType.Student ? 'student': userType === UserType.Staff ? 'staff' : 'admin'}/login`)
    };

    const onClose = (e: SyntheticEvent) => {
        e.preventDefault();
        decline();
    };

    return (
        <Modal
            title="Choose Account Type"
            centered
            visible={isOpen}
            footer={null}
            closeIcon={<a type="button" aria-label="Close" href="/#/" className="ant-modal-close" onClick={onClose}>
                <span className="ant-modal-close-x">
                    <span role="img" aria-label="close" className="anticon anticon-close ant-modal-close-icon">
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                        </svg>
                    </span>
                </span>
            </a>}
            wrapClassName="Choose-User__Wrapper"
        >
            <div className="User-type__wrapper">
                <div className={`Card__small ${userType === UserType.Student ? 'select': ''}`} onClick={() => setUserType(UserType.Student)}>
                    <div className="radio"><div></div></div>
                    <div className="icon">
                        <img src={Student} alt="Student"/>
                    </div>
                    <div className="label">Student</div>
                </div>
                <div className={`Card__small ${userType === UserType.Staff ? 'select': ''}`} onClick={() => setUserType(UserType.Staff)}>
                    <div className="radio"><div></div></div>
                    <div className="icon">
                        <img src={Teacher} alt="Staff" />
                    </div>
                    <div className="label">Staff</div>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={onAccept}>Next</button>
                </div>
            </div>
        </Modal>
    )
}
