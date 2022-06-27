import { Button, DatePicker, Form, message, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { postRequest } from "../../core/apiService";
import { DATE_FORMAT, UserType } from "../../core/constants/common";
import { getUserType } from "../../core/services";
const { Option } = Select;

export function ApplyLeave({ staffList }: { staffList: { label: string; value: string; }[] }) {
    const [form] = Form.useForm();
    const [loading, toggleLoader] = useState(false);
    const currentUserRole = getUserType();

    const onFinish = (values: any) => {
        toggleLoader(true);
        postRequest({ url: "/leave/staff/apply", payload: {
            leaveDate: values.date.format(DATE_FORMAT),
            reason: values.reason,
            ...(currentUserRole === UserType.Admin ? { staffId: values.staffId }: {})
        }})
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
            {
                currentUserRole === UserType.Staff &&
                <div className="Leave-warning__Wrapper">
                    Leave is earned by an employee and granted by the employer to take time off work. The employee is free to avail this leave in accordance with the company policy.
                </div>
            }
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
                                {
                                    currentUserRole === UserType.Admin ?
                                    <div className="col-md-12">
                                        <Form.Item name="staffId" label="Staff" rules={[{ required: true, message: 'Please select the Staff' }]}>
                                            <Select>
                                                {
                                                    staffList.map((staff) => (
                                                        <Option value={staff.value} key={staff.value}>{staff.label}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                    </div> : null
                                }
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
