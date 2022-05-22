import { Steps } from "antd";
import React, { useState } from "react";
import HeaderLight from "../../core/headerLight";
import { isMobileDevice } from "../../core/utils";
import { Assessment } from "./Assessment";
import { CourseInfo, ICourseInfo } from "./CourseInfo";
import { IPersonalInfo, PersonalInfo } from "./PersonalInfo";

import "./studentRegistration.scss";

enum FormStatus {
    Success = 1,
    Pending = 2,
    Error = 3
}

interface RegistrationForm {
    personalInfo: any;
    courseInfo: any;
    assessment: any;
}

interface RegistrationFormStatus {
    personalInfo: FormStatus;
    courseInfo: FormStatus;
    assessment: FormStatus;
}

const { Step } = Steps;
const DEFAULT_FORM = {
    personalInfo: {
        prefix: '+91'
    },
    courseInfo: {},
    assessment: {}
};

const DEFAULT_FORM_STATUS = {
    personalInfo: FormStatus.Pending,
    courseInfo: FormStatus.Pending,
    assessment: FormStatus.Pending
};

export function RegistrationWrapper() {

    const [current, setStep] = useState(0);
    const [formData, setFormData] = useState<RegistrationForm>({ ...DEFAULT_FORM });
    const [formStatus, setFormStatus] = useState<RegistrationFormStatus>({ ...DEFAULT_FORM_STATUS });
    const isMobile: boolean = isMobileDevice();

    const onChange = (s: number) => {
        setStep(s);
    };

    const getCurrentStatus = (state: number): any => {
        if (current === state) {
            return "process";
        } else if (current > state) {
            return "finish";
        } else {
            return "wait";
        }
    };

    const onPersonalInfoSubmit = (value: IPersonalInfo) => {
        setFormData((f) => ({
            ...f,
            personalInfo: value
        }));
        setFormStatus((s) =>({
            ...s,
            personalInfo: FormStatus.Success,
            courseInfo: FormStatus.Pending
        }));
        setStep(1);
    };

    const onCourseInfoSubmit = (value: ICourseInfo) => {
        setFormData((f) => ({
            ...f,
            courseInfo: value
        }));
        setFormStatus((s) =>({
            ...s,
            courseInfo: FormStatus.Success,
            assessment: FormStatus.Pending
        }));
        setStep(2);
    };

    const onAssessmentSubmit = (value: any) => {
        setFormData((f) => ({
            ...f,
            assessment: value
        }));
        setFormStatus((s) =>({
            ...s,
            courseInfo: FormStatus.Success,
            assessment: FormStatus.Success
        }));
    };

    const goToPersonalInfo = () => setStep(0);
    const goToCourseInfo = () => setStep(1);

    return (
        <>
            <HeaderLight>
                <div className="pr-2 pt-3">
                    <h5>OET Booking</h5>
                    <Steps
                        type="navigation"
                        current={current}
                        onChange={onChange}
                        className="site-navigation-steps"
                        responsive={false}
                    >
                        <Step status={getCurrentStatus(0)} title={!isMobile ? "Personal Information" : "" } />
                        <Step status={getCurrentStatus(1)} title={!isMobile ? "Course Information" : "" }
                            disabled={formStatus.courseInfo === FormStatus.Pending}/>
                        <Step status={getCurrentStatus(2)} title={!isMobile ? "Assessment" : "" }
                            disabled={formStatus.assessment === FormStatus.Pending}
                        />
                    </Steps>
                    <div className="steps-content">
                        { current === 0 && <PersonalInfo formData={formData.personalInfo} onSubmit={onPersonalInfoSubmit}/> }
                        { current === 1 && <CourseInfo formData={formData.courseInfo} onSubmit={onCourseInfoSubmit} previous={goToPersonalInfo}/> }
                        { current === 2 && <Assessment formData={formData.assessment} onSubmit={onAssessmentSubmit} previous={goToCourseInfo} /> }
                    </div>
                </div>
            </HeaderLight>
        </>
    );
}
