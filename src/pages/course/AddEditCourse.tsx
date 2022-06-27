import { Button, Drawer, Form, Input, message, Space, Spin } from "antd";
import { isMobileDevice } from "../../core/utils";
import { useEffect, useState } from "react";
import SunEditor from 'suneditor-react';
import list from 'suneditor/src/plugins/submenu/list'
import {
    blockquote,
    align,
    font,
    fontSize,
    fontColor,
    hiliteColor,
    horizontalRule,
    formatBlock,
    lineHeight,
    textStyle,
    link
} from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor
import { postRequest } from "../../core/apiService";

interface IAddEditCourse {
    isOpen: boolean;
    handleOk?: (t?: any) => void;
    handleCancel?: (t?: any) => void;
    data?: any;
}

export function AddEditCourse({ isOpen, handleOk, handleCancel, data }: IAddEditCourse) {
    const [form] = Form.useForm();
    const width = !isMobileDevice() ? 700 : window.innerWidth;
    const [details, setDetails] = useState('');
    const [loading, toggleLoading] = useState(false);

    const addEditCourse = (course: any) => {
        toggleLoading(true);
        postRequest({ url: course.courseId ? "/course/update" : "/course/new", payload: course })
            .then(() => {
                message.success(`${data ? "Edit": "Add"} course successfully!`);
                handleOk && handleOk();
                toggleLoading(false);
            })
            .catch((err) => {
                message.error(`${data ? "Edit": "Add"} course failed!`);
                handleCancel && handleCancel(err);
                toggleLoading(false);
            });
    };

    useEffect(() => {
        if (form) {
            form?.resetFields();
            data && form?.setFieldsValue({ name: data.name });
            data && setDetails(data.details);
        }
        if (!data) {
            setDetails('');
        }
    }, [isOpen, form]);

    const onFinish = (values: any) => {
        console.log(values)
        handleOk && addEditCourse(data ? {...values, details, courseId: data._id} : {...values, details});
    };

    const onSubmit = () => {
        form.submit();
    };

    const onDetailsChange = (text: string) => {
        setDetails(text);
    };
    
    return (
        <Drawer
            title={`${!!data ? 'Edit' : 'Add'} Course Details`}
            placement="right"
            width={width}
            onClose={handleCancel}
            visible={isOpen}
            footer={
                <Space align="end" wrap className="d-flex justify-content-end">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" onClick={onSubmit}>
                        Save
                    </Button>
                </Space>
            }
            getContainer={false}
        >
            <Spin spinning={loading}>
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Course Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the Course Name!' }]}
                    >
                        <Input size="large" placeholder="Enter the Course Name" />
                    </Form.Item>
                </Form>
                <SunEditor name="details" onChange={onDetailsChange} setContents={details} setOptions={{
                    plugins: [
                        blockquote,
                        align,
                        font,
                        fontSize,
                        fontColor,
                        hiliteColor,
                        horizontalRule,
                        formatBlock,
                        lineHeight,
                        textStyle,
                        link,
                        list
                    ],
                    buttonList: [
                        [
                            'blockquote',
                            'align',
                            'font',
                            'fontSize',
                            'fontColor',
                            'hiliteColor',
                            'horizontalRule',
                            'formatBlock',
                            'lineHeight',
                            'textStyle',
                            'link',
                            'list'
                        ]
                    ]
                    }}
                    placeholder="Please type here..."
                />
            </Spin>
        </Drawer>
    );
}
