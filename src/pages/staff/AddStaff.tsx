import { Form, Input, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { postRequest } from "../../core/apiService";

interface IAddStaff {
    isOpen?: boolean;
    handleClose?: (t?: boolean) => void;
}

export function AddStaff({ isOpen, handleClose }: IAddStaff) {
    const [form] = Form.useForm();
    const [loading, toggleLoader] = useState(false);

    const onSubmit = () => {
        form.submit();
    };

    const onFinish = (values: any) => {
        toggleLoader(true);
        postRequest({ url: "/staff/new", payload: { ...values }})
        .then((res) => {
            handleClose && handleClose(true);
            message.success("Staff added successfully");
            toggleLoader(false);
        })
        .catch((err) => {
            message.error("Failed to add Staff!");
            toggleLoader(false);
        });
    };

    useEffect(() => {
        if (form) {
            form?.resetFields();
        }
    }, [isOpen, form]);

    return (
        <Modal title="Add Staff" visible={isOpen} onOk={onSubmit} onCancel={() => handleClose && handleClose(false)} okText="Save">
            <Spin spinning={loading}>
                {
                    isOpen && <Form
                        name="basic"
                        labelCol={{ span: 16 }}
                        wrapperCol={{ span: 24 }}
                        onFinish={onFinish}
                        autoComplete="off"
                        form={form}
                        layout="vertical"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input the Staff Name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="E-mail"
                            rules={[
                                { type: 'email', message: 'The input is not valid E-mail!' },
                                { required: true, message: 'Please input your E-mail!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                () => ({
                                    validator(_, value) {
                                        if (value && isNaN(value)) {
                                        return Promise.reject(new Error('The input is not a valid phone number!'));
                                        }
                                        return Promise.resolve();
                                    }
                                })
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                }
            </Spin>
        </Modal>
    )
}
