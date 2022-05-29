import { Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import { postRequest } from "../../core/apiService";
import HeaderLight from "../../core/headerLight";
import { isMobileDevice } from "../../core/utils";
import { Assessment } from "./Assessment";
import { CourseInfo, ICourseInfo } from "./CourseInfo";
import { IPersonalInfo, PersonalInfo } from "./PersonalInfo";
import questionList from "../../core/constants/questions";

import "./studentRegistration.scss";
import { useNavigate } from "react-router";

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
        prefix: "+91"
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
    const navigation = useNavigate();

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

    const registerApi = () => {
        const data = { ...formData.personalInfo, ...formData.courseInfo };
        const payload = new FormData();
        const questions: { type: string; question: any; answer: any; }[] = [];
        Object.keys(data).forEach((name: string) => {
            if ( name === "dob") {
                payload.append(name, data[name as keyof typeof data].format());
            } else if ( name === "idProof" ) {
                payload.append(name, data[name as keyof typeof data][0].originFileObj);
            } else if ( name === "phone" ) {
                payload.append(name, `${data.prefix}-${data[name as keyof typeof data]}`);
            } else if ( name !== "prefix" ) {
                payload.append(name, data[name as keyof typeof data]);
            }
        });
        Object.keys(formData.assessment).forEach((name: string) => {
            const [type, index] = name.split("_");
            questions.push({
                type,
                question: (questionList as any)[type][+index - 1].question,
                answer: formData.assessment[name]
            });
        });
        payload.append("questions", JSON.stringify(questions));

        postRequest("http://localhost:3001/student/booking", payload).then((res: any) => {
            Modal.success({
                content: res.message,
            });
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            navigation("/");
        }).catch((err) => {
            Modal.error({
                title: "Error!",
                content: err?.message,
            });
        });
    };

    useEffect(() => {
        if (formStatus.assessment === FormStatus.Success) {
            registerApi();
        }
    }, [formStatus, formStatus?.assessment]);

    const onPersonalInfoSubmit = (value: IPersonalInfo) => {
        setFormData((f) => ({
            ...f,
            personalInfo: value
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
