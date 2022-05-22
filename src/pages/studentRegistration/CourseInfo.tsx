import {
    Form,
    Input,
    Button,
    Radio,
    Space
} from 'antd';

export interface ICourseInfo {
    currentStatus?: string;
    purpose?: string;
    courseType?: string;
    internetConnection?: string;
    englishRating?: string;
    vertical?: string;
}

export function CourseInfo({ formData, onSubmit, previous }: { formData: ICourseInfo, onSubmit: (t: any) => any, previous: (t: any) => any }) {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        onSubmit(values);
    };

    return (
        <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={formData}
            scrollToFirstError
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Form.Item name="currentStatus" label="Current Status" rules={[{ required: true, message: 'Please enter the Job Status!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="fullTime">
                                        Working Full-time
                                        {<Input style={{ width: 100, marginLeft: 10 }} />}
                                    </Radio>
                                    <Radio value="partTime">
                                        Working Part-time
                                        {<Input style={{ width: 100, marginLeft: 10 }} />}
                                    </Radio>
                                    <Radio value="student">Student</Radio>
                                    <Radio value="jobSeeker">Job Seeker</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="purpose" label="Purpose Of Writing OET" rules={[{ required: true, message: 'Please enter the Purpose!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="studyAbroad">Study Abroad - ACADEMICS</Radio>
                                    <Radio value="prForCaAuNz">PR for Canada/ Australia/ New Zealand - GENERAL</Radio>
                                    <Radio value="workVisa">Work Visa for NURSES - ACADEMICS (The UK/ Australia/ New Zealand/ Ireland/ Malta/ Germany)*</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="courseType" label="Course Type" rules={[{ required: true, message: 'Please enter the Course Type!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="studyAbroad">Study Abroad - ACADEMICS</Radio>
                                    <Radio value="prForCaAuNz">PR for Canada/ Australia/ New Zealand - GENERAL</Radio>
                                    <Radio value="workVisa">Work Visa for NURSES - ACADEMICS (The UK/ Australia/ New Zealand/ Ireland/ Malta/ Germany)*</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="internetConnection" label="Which internet connection are you using?" rules={[{ required: true, message: 'Please enter the Connection Type!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="studyAbroad">Study Abroad - ACADEMICS</Radio>
                                    <Radio value="prForCaAuNz">PR for Canada/ Australia/ New Zealand - GENERAL</Radio>
                                    <Radio value="workVisa">Work Visa for NURSES - ACADEMICS (The UK/ Australia/ New Zealand/ Ireland/ Malta/ Germany)*</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="englishRating" label="How would you rate your English speaking skills out of 5?" rules={[{ required: true, message: 'Please enter the your Rating!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="5">5 - Very advanced</Radio>
                                    <Radio value="4">4 - Advanced</Radio>
                                    <Radio value="3">3 - Average</Radio>
                                    <Radio value="2">2 - Below average</Radio>
                                    <Radio value="1">1 - Beginner</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-12 d-flex justify-content-end mt-3">
                        <Form.Item>
                            <Button type="primary" size="large" ghost onClick={previous}>
                                Previous
                            </Button>
                            <Button type="primary" htmlType="submit" size="large" className="ml-3">
                                Next
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
    )
}
