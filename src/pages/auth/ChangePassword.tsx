import { Form, Input, message, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { postRequest } from "../../core/apiService";
import { UserType } from "../../core/constants/common";
import { getUserType } from "../../core/services";

interface IChangePassword {
    isOpen: boolean;
    toggleModal: () => any;
}

export function ChangePassword({ isOpen, toggleModal }: IChangePassword) {
    const [form] = Form.useForm();
    const [loading, toggleLoader] = useState(false);
    // const currentUserRole = getUserType();

    const onFinish = (values: any) => {
        toggleLoader(true);
        postRequest({ url: "/change-password", payload: { currentPassword: values.currentPassword, newPassword: values.newPassword }})
        .then((res) => {
            toggleModal();
            message.success("Password changes successfully");
            toggleLoader(false);
        })
        .catch((err) => {
            message.error("Failed to change password!");
            toggleLoader(false);
        });
    };

    useEffect(() => {
        if (form) {
            form?.resetFields();
        }
    }, [isOpen, form]);

    const onSubmit = () => {
        form.submit();
    };

    return (
        <Modal title="Change Password" visible={isOpen} onOk={onSubmit} onCancel={toggleModal} okText="Submit">
            <Spin spinning={loading}>
                <Form
                    name="basic"
                    labelCol={{ span: 16 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        label="Current Password"
                        name="currentPassword"
                        rules={[{ required: true, message: 'This is required field' }]}
                    >
                        <Input.Password type="password"/>
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="newPassword"
                        rules={[{ required: true, message: 'This is required field' }]}
                    >
                        <Input.Password type="password"/>
                    </Form.Item>
                    <Form.Item
                        label="Confirm New Password"
                        name="confirmNewPassword"
                        rules={[
                            { required: true, message: 'This is required field' },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered does not match!'));
                              }
                            })
                        ]}
                    >
                        <Input.Password type="password"/>
                    </Form.Item>
                </Form>
            </Spin>
        </Modal>
    );
}
