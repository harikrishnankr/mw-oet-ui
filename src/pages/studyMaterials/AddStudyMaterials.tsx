import { Button, Drawer, Form, Input, Radio, Select, Space, Upload, Modal, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { postRequest } from "../../core/apiService";
import { isMobileDevice } from "../../core/utils";

export interface IAddStudyMaterials {
    isOpen: boolean;
    handleCancel?: (t?: any) => any;
    courses: any[];
}

const { Option } = Select;

export function AddStudyMaterials({ isOpen, handleCancel, courses }: IAddStudyMaterials) {
    const [form] = Form.useForm();
    const [courseType, setCourseType] = useState("");
    const [loading, toggleLoader] = useState(false);
    const width = !isMobileDevice() ? 750 : window.innerWidth;

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const onValuesChange = (changedValues: any) => {
        if (changedValues["type"]) {
            setCourseType(changedValues.type);
        }
    };

    const onSubmit = () => {
        form.submit();
    };

    const onFinish = (values: any) => {
        const payload = new FormData();
        Object.keys(values).forEach((key: string) => {
            if (key === "document") {
                payload.append(key, values[key as keyof typeof values][0].originFileObj);
            } else {
                payload.append(key, values[key as keyof typeof values]);
            }
        });
        toggleLoader(true);
        postRequest({ url: "/study-materials/new", payload, isFormData: true, skipAuth: false })
            .then(() => {
                message.success("Successfully added document");
                toggleLoader(false);
                handleCancel && handleCancel(true);
            }).catch((err) => {
                toggleLoader(false);
                message.error(err?.message);
            });
    };

    useEffect(() => {
        if (form) {
            form?.resetFields();
            setCourseType("");
        }

    }, [isOpen, form]);

    return (
        <Drawer
            title="Add Study Materials"
            placement="right"
            width={width}
            visible={isOpen}
            getContainer={false}
            onClose={() => handleCancel && handleCancel(false)}
            footer={
                <Space align="end" wrap className="d-flex justify-content-end">
                    <Button onClick={() => handleCancel && handleCancel(false)}>Cancel</Button>
                    <Button type="primary" onClick={onSubmit}>
                        Save
                    </Button>
                </Space>
            }
        >
            <Spin spinning={loading}>
                <Form
                    name="basic"
                    labelCol={{ span: 16 }}
                    wrapperCol={{ span: 24 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                    onValuesChange={onValuesChange}
                    layout="vertical"
                >
                    <Form.Item
                        name="course"
                        label="Course Type"
                        hasFeedback
                        rules={[{ required: true, message: 'Please select a course!' }]}
                    >
                        <Select placeholder="Please select a course">
                            {
                                courses.map((c: any) => (<Option value={c.value} key={c.value}>{c.label}</Option>))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        label="Name"
                        hasFeedback
                        rules={[{
                            required: true,
                            message: 'Please input the name'
                        }]}
                    >
                        <Input placeholder="Please input the name" />
                    </Form.Item>
                    <Form.Item label="File Type" name="type" hasFeedback rules={[{
                        required: true,
                        message: 'Please input the file type'
                    }]}>
                        <Radio.Group>
                            <Radio.Button value="PDF">Pdf</Radio.Button>
                            <Radio.Button value="IMAGE">Image</Radio.Button>
                            <Radio.Button value="VIDEO_URL">Video ID</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                    {
                        courseType === "VIDEO_URL" &&
                        <Form.Item
                            name="videoUrl"
                            label="Video ID"
                            hasFeedback
                            rules={[{
                                required: true,
                                message: 'Please input the video ID'
                            }]}
                        >
                            <Input placeholder="Please input the video URL" />
                        </Form.Item>
                    }
                    {
                        (courseType == "PDF" || courseType == "IMAGE") &&
                        <Form.Item label="Study Material">
                            <Form.Item name="document" valuePropName="fileList"
                                getValueFromEvent={normFile} noStyle rules={[{
                                    required: true,
                                    message: 'Please input the video url'
                                }]}
                            >
                                <Upload.Dragger name="files" beforeUpload={() => false} maxCount={1} accept="image/*,application/pdf,image/x-eps">
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    }
                </Form>
            </Spin>
        </Drawer>
    )
}