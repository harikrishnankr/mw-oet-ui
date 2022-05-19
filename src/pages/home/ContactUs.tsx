import "./style/contactUs.scss";
import contactUs from "../../assets/images/contact-us.png";
import { ChangeEventHandler, SyntheticEvent, useState } from "react";

interface IOption {
    key: any;
    label: string;
}

interface IForm {
    fullName?: string;
    email?: string;
    phoneNumber?: string;
    course?: string;
    message?: string;
}

interface IInput {
    type: string;
    name: string;
    errorMessage?: string;
    placeholder?: string;
    options?: IOption[];
    onChange?: (t: any) => any;
}

function Input({ type, errorMessage, name, placeholder, options, onChange }: IInput) {

    const getField = () => {
        switch (type) {
            case "text":
                return (
                    <div className="form-group has-error">
                        <input type="text" className="form-control" id={name} name={name} placeholder={placeholder} onChange={onChange}/>
                        {
                            errorMessage &&
                            <div className="help-block with-errors">
                                <ul className="list-unstyled">
                                    <li>{errorMessage}</li>
                                </ul>
                            </div>
                        }
                    </div>
                );
            case "select":
                return (
                    <div className="form-group has-error">
                        <select className="form-control" id={name} name={name} onChange={onChange}>
                            {
                                options && options.map((option: IOption, i: number) => (
                                    <option value={option.key} key={i + " " + option.key}>{option.label}</option>
                                ))
                            }
                        </select>
                        {
                            errorMessage &&
                            <div className="help-block with-errors">
                                <ul className="list-unstyled">
                                    <li>{errorMessage}</li>
                                </ul>
                            </div>
                        }
                    </div>
                );
        }
    };

    return (
        <>{ getField() }</>
    );
};

export default function ContactUs() {

    const [formData, setFormData] = useState<IForm>({});
    const [errorMessage, setErrorMessages] = useState<IForm>({});

    const courses = [
        { key: "", label: "Select Course" },
        { key: "OET Regular", label: "OET Regular" },
        { key: "OET Speaking Only", label: "OET Speaking Only" },
    ];

    const handleInputChange: ChangeEventHandler<HTMLInputElement|HTMLTextAreaElement> = (e) => {

        const target: HTMLInputElement = e.target as HTMLInputElement;

        setFormData({
            ...formData,
            [target?.name]: target?.value
        })
    };

    const validate = () => {
        const data = formData as IForm;
        const error = {
            fullName: !data.fullName ? "Please enter your name" : "",
            email: !data.email ? "Please enter your Email": "",
            phoneNumber: !data.phoneNumber ? "Please enter your phone number": "",
            course: !data.course ? "Please select your Course": "",
            message: !data.message ? "Write your message": ""
        };
        setErrorMessages(error);

        return (error.fullName || error.email || error.phoneNumber || error.course || error.message);
    };

    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) {
            console.log(formData);
            // Call API
        }
    };

    return (
        <section id="contact-us" className="section">
            <div className="container">
                <h3 className="text-center section-title">Contact Us</h3>
                <div className="row">
                    <div className="col-lg-6 col-md-12 pl-0 pt-70 pr-5">
                        <div className="contact-us-vector">
                            <img src={contactUs} className="img-fluid" alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 pl-4">
                        <form id="contactForm" onSubmit={onSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Input type="text" name="fullName" placeholder="Full Name" errorMessage={errorMessage.fullName} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <Input type="text" name="email" placeholder="Email" errorMessage={errorMessage.email} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <Input type="text" name="phoneNumber" placeholder="Phone Number" errorMessage={errorMessage.phoneNumber} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-6">
                                    <Input type="select" name="course" errorMessage={errorMessage.course} options={courses} onChange={handleInputChange} />
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group has-error">
                                        <textarea className="form-control" id="message" name="message" placeholder="Write Message" rows={4} onChange={handleInputChange}></textarea>
                                        {
                                            errorMessage.message && 
                                            <div className="help-block with-errors">
                                                <ul className="list-unstyled">
                                                    <li>Write your message</li>
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    <div className="submit-button">
                                        <button id="submit" type="submit">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}