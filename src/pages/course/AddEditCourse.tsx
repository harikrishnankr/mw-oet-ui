import { Button, Drawer, Form, Input, Space } from "antd";
import { isMobileDevice } from "../../core/utils";
import { useState } from "react";
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

interface IAddEditCourse {
    isOpen: boolean;
    handleOk?: (t?: any) => void;
    handleCancel?: (t?: any) => void;
    data?: any;
}

export function AddEditCourse({ isOpen, handleOk, handleCancel, data }: IAddEditCourse) {
    const [form] = Form.useForm();
    const width = !isMobileDevice() ? 700 : window.innerWidth;
    const [description, setDescription] = useState('');

    const onFinish = (values: any) => {
        console.log(values)
        handleOk && handleOk();
    };

    const onSubmit = () => {
        form.submit();
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
        >
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
            <SunEditor setOptions={{
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
			}}/>
        </Drawer>
    );
}
