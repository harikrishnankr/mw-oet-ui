import {
    Form,
    Input,
    Button,
    Radio,
    Space,
    RadioChangeEvent
} from 'antd';
import { useState } from 'react';

export interface ICourseInfo {
    currentStatus?: string;
    purpose?: string;
    courseType?: string;
    internetConnection?: string;
    englishRating?: string;
    vertical?: string;
}

export function CourseInfo({ formData, onSubmit, previous, courses }: { formData: ICourseInfo, onSubmit: (t: any) => any, previous: (t: any) => any, courses: any[] }) {
    const [form] = Form.useForm();
    const [currentStatus, setCurrentStatus] = useState<string|null>(formData.currentStatus || null);

    const onFinish = (values: any) => {
        onSubmit(values);
    };

    const onStatusChange = (e: RadioChangeEvent) => {
        setCurrentStatus(e.target.value)
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
                            <Radio.Group onChange={onStatusChange}>
                                <Space direction="vertical">
                                    <Radio value="Working Full-time">
                                        Working Full-time
                                        {
                                            currentStatus === "Working Full-time" ?
                                                <Form.Item label="Job" name="job" rules={[{ required: true, message: 'Please enter the Please enter job!' }]}>
                                                    <Input style={{ width: 100, marginLeft: 10 }} />
                                                </Form.Item>:
                                                null
                                        }
                                    </Radio>
                                    <Radio value="Working Part-time">
                                        Working Part-time
                                        {
                                            currentStatus === "Working Part-time" ?
                                                <Form.Item label="Job" name="job" rules={[{ required: true, message: 'Please enter the Please enter job!' }]}>
                                                    <Input style={{ width: 100, marginLeft: 10 }} />
                                                </Form.Item> :
                                                null
                                        }
                                    </Radio>
                                    <Radio value="Student">Student</Radio>
                                    <Radio value="Job Seeker">Job Seeker</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="purpose" label="Purpose Of Writing OET" rules={[{ required: true, message: 'Please enter the Purpose!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="Improve English Language">Improve English Language</Radio>
                                    <Radio value="Work Visa for NURSES">Work Visa for NURSES</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="courseType" label="Course Type" rules={[{ required: true, message: 'Please enter the Course Type!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    {
                                        courses.map((c) => (
                                            <Radio value={c.id} key={c.id}>{c.name}</Radio>
                                        ))
                                    }
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="internetConnection" label="Which internet connection are you using?" rules={[{ required: true, message: 'Please enter the Connection Type!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="Mobile Data">Mobile Data</Radio>
                                    <Radio value="Standard Broadband Connection">Standard Broadband Connection</Radio>
                                    <Radio value="Broadband Optical Fiber connection">Broadband Optical Fiber connection</Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="englishRating" label="How would you rate your English speaking skills out of 5?" rules={[{ required: true, message: 'Please enter the your Rating!' }]}>
                            <Radio.Group>
                                <Space direction="vertical">
                                    <Radio value="Very advanced">5 - Very advanced</Radio>
                                    <Radio value="Advanced">4 - Advanced</Radio>
                                    <Radio value="Average">3 - Average</Radio>
                                    <Radio value="Below average">2 - Below average</Radio>
                                    <Radio value="Beginner">1 - Beginner</Radio>
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
