import { Button, DatePicker, Form, message, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { postRequest } from "../../core/apiService";
import { DATE_FORMAT } from "../../core/constants/common";

export function ApplyLeave() {
    const [form] = Form.useForm();
    const [loading, toggleLoader] = useState(false);

    const onFinish = (values: any) => {
        toggleLoader(true);
        postRequest({ url: "/leave/staff/apply", payload: { leaveDate: values.date.format(DATE_FORMAT), reason: values.reason } })
        .then((res) => {
            message.success("Leave Applied successfully");
            toggleLoader(false);
            form.resetFields();
        })
        .catch((err) => {
            toggleLoader(false);
        });
    };

    const cancel = () => {
        form.resetFields();
    };

    return (
        <> 
            <div className="Leave-warning__Wrapper">
                Leave is earned by an employee and granted by the employer to take time off work. The employee is free to avail this leave in accordance with the company policy.
            </div>
            <div className="Leave-request__Wrapper">
                <Spin spinning={loading}>
                    <Form
                        layout="vertical"
                        form={form}
                        name="leaveRequest"
                        onFinish={onFinish}
                        scrollToFirstError
                        className="mt-3"
                    >
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please input the Date' }]}>
                                        <DatePicker format={DATE_FORMAT}/>
                                    </Form.Item>
                                </div>
                                <div className="col-md-12">
                                    <Form.Item name="reason" label="Reason" rules={[{ required: true, message: 'Please input the reason for leave!' }]}>
                                    <TextArea rows={4} maxLength={250} />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 d-flex justify-content-end mt-3">
                                    <Form.Item>
                                        <Button type="default" onClick={cancel}>Cancel</Button>
                                        <Button type="primary" htmlType="submit" className="ml-3">Apply</Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Spin>
            </div>
        </>
    )
}
