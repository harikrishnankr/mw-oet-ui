import { Modal, message, Switch } from "antd";
import { useEffect, useState } from "react";

export function TermsAndCondition({isOpen, accept, decline}: { isOpen: boolean; accept: () => any; decline: () => any;}) {

    const width = window.innerWidth;
    const [read, setRead] = useState(false);
    const onChange = (checked: boolean) => {
        setRead(checked);
    };

    useEffect(() => {
        setRead(false);
    }, [isOpen]);

    const onAccept = () => {
        if (read) {
            accept();
        } else {
            message.error("Please check below checkbox to Yes to mark as read then click on Accept!")
        }
    };

    return (
        <Modal
            title="Terms and Condition/Refund Policy"
            centered
            visible={isOpen}
            onOk={onAccept}
            onCancel={decline}
            width={width}
            okText="Accept"
            cancelText="Decline"
        >
            <div>
                <div>
                    <p>Refund Policy</p>
                    <ul>
                        <li>
                            1. The complete pre-booking amount shall be refunded if the
                            customer cancels the reservation prior to the commencement of the
                            first class..
                        </li>
                        <li>
                            2. 40% of the total amount paid will be refunded if the customer
                            cancels the course after the first class. (Applicable only for the
                            first 3 days and only for customers who paid the total fees)
                        </li>
                        <li>
                            3. If discontinued after attending the first 3 three classes or
                            after the first 3 days from the first class, No fees will be
                            refunded.
                        </li>
                        <li>
                            4. No refund will be initiated for those who cancel the class
                            after only paying half of the total fees of the respected course.
                            (Applicable from the 1st day onwards. ).
                        </li>
                        <li>
                            Second month fees will not be refunded if the student
                            &nbsp;prefers to end the classes after the first month.&nbsp;
                        </li>
                    </ul>
                    <p>Terms and Conditions/Privacy Policy.</p>
                    <ul>
                        <li>
                            We give utmost priority to the privacy of students. No pictures or
                            videos will be published on any social media without the prior
                            permission of the concerned party. All classes will be recorded
                            for internal training purposes.
                        </li>
                        <li>
                            Recorded sessions will not be given to students or any third party
                            or any kind of analysis.
                        </li>
                        <li>
                            Students are advised to not record and/or share any footage of
                            classes anywhere online or offline to avoid Legal actions
                        </li>
                        <li>
                            Any kind of unruly behavior from the side of management or staff
                            would be dealt with the utmost severity and appropriately
                        </li>
                        <li>
                            Any kind of ill-mannered behavior of students which may tarnish
                            the image of the academy or any abusive behavior of the students
                            resulting in any kind of sexual violation will also be reported to
                            the police.
                        </li>
                        <li>
                            All data collected would be kept confidential, unless a legal body
                            asks to submit them in court.
                        </li>
                        <li>
                            We work constantly to improve our services and develop new
                            features to make our Products better for you and our community. As
                            a result, we may need to update these Terms from time to time to
                            accurately reflect our services and practices. We will only make
                            changes if the provisions are no longer appropriate or if they are
                            incomplete, and only if the changes are reasonable and take due
                            account of your interests.
                        </li>
                        <li>
                            We will notify you (for example, by email or through our Products)
                            at least 30 days before we make changes to these Terms and give
                            you an opportunity to review them before they go into effect
                            unless changes are required by law. Once any updated Terms are in
                            effect, you will be bound by them if you continue to use our
                            Products.
                        </li>
                        <li>
                            We may use the Information to contact you from time to time, to
                            provide you with the Services, important information, required
                            notices and marketing promotions. We will ask you when we need
                            more information that personally identifies you (personal
                            information) or allows us to contact you.
                        </li>
                        <li>
                            We use the collected information to analyze trends, to conduct
                            research, to administer the Application/Services and products, to
                            learn about each user's learning patterns and movements around the
                            Application/Services and products and to gather demographic
                            information and usage behavior about our user base as a whole.
                            Aggregated and individual, anonymized and non-anonymized data may
                            periodically be transmitted to external service providers to help
                            us improve the Application, products and our Services. We will
                            share your information with third parties only in the ways that
                            are described below in this Policy. We may use the individual data
                            and behavior patterns combined with personal information to
                            provide you with personalized content and better your learning
                            objectives. Third parties provide certain services which we may
                            use to analyze the data and information to personalize, drive
                            insights and help us better your experience or reach out to you
                            with more value-added applications, products, information and
                            services. However, these third-party companies do not have any
                            independent right to share this information. We do not sell, trade
                            or rent your information to any third party unless we have been
                            expressly authorized by you either in writing or electronically to
                            do so. We may at times provide aggregate statistics about our
                            customers, traffic patterns, and related site information to
                            reputable third parties, however, this information when disclosed
                            will be in an aggregate form and does not contain any of your
                            Personally Identifiable Information. We may disclose Information:
                        </li>
                        <li>
                            as required by law, such as to comply with a subpoena or similar
                            legal process;
                        </li>
                        <li>
                            to enforce applicable ToU, including investigation of potential
                            violations thereof;
                        </li>
                        <li>
                            when we believe in good faith that disclosure is necessary to
                            protect our rights, protect your safety or the safety of others,
                            investigate fraud, address security or technical issues or respond
                            to a government request;
                        </li>
                        <li>
                            with our trusted services providers who work on our behalf, do not
                            have an independent use of the information we disclose to them and
                            have agreed to adhere to the rules set forth in this Policy;
                        </li>
                        <li>
                            to protect against imminent harm to the rights, property or safety
                            of the Application/Website/ Think and Learn Private Limited or its
                            users or the public as required or permitted by law;
                        </li>
                        <li>
                            with third-party service providers in order to personalize the
                            Application/Website/Services/products for better user experience
                            and to perform behavioral analysis;
                        </li>
                        <li>
                            Any portion of the Information containing personal data relating
                            to minors provided by you shall be deemed to be given with the
                            consent of the minor's legal guardian. Such consent is deemed to
                            be provided by your registration with us..
                        </li>
                    </ul>
                </div>
                <div className="mt-3">
                    <Switch checkedChildren="Yes" unCheckedChildren="No" onChange={onChange} />
                    <span className="ml-2">I have read the agreement and agree with our terms and Conditions</span>
                </div>
                { !read && <div className="ant-form-item-explain-error">Click here to accept our Terms and Conditions</div> }
            </div>
        </Modal>
    );
}
