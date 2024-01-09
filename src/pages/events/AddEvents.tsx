import { Button, DatePicker, Drawer, Form, FormInstance, Input, Space, Spin, Upload, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { isMobileDevice } from "../../core/utils";
import moment from "moment";
import { postRequest } from "../../core/apiService";

interface IEvent {
    isOpen: boolean;
    result?: any;
    handleCancel?: (t?: any) => void;
}

interface DataType {
    key: React.Key;
    eventsName: string;
    imageUrl: string;
    startDate: string;
    endDate: string;
}

export function AddEvents({ isOpen, handleCancel }: IEvent) {
    const width = !isMobileDevice() ? 750 : window.innerWidth;
    const [form] = Form.useForm<FormInstance<DataType>>();
    const [loading, toggleLoader] = useState(false);
    const [profileImageUncropped, setProfileFile] = useState(null);
    const avatarEditor = useRef(null);

    const onSubmit = () => {
        form.submit();
    };

    const beforeUpload = (file: File) => {
        const maxFileSize = 1024*3*1024; //3MB
        const isAllowed = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'application/pdf';
        if (!isAllowed) {
          message.error(`${file.name} is not a png/jpeg/jpg/pdf file`);
        } else if (maxFileSize < file.size) {
            message.error(`${file.name} should be under 3MB file size`);
        }
        return (!isAllowed || maxFileSize < file.size) ? Upload.LIST_IGNORE : false;
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    const getImageUrl = async () => {
        const type = (profileImageUncropped as any)?.type || "image/jpeg";
        const mimeType = type.split("/");
        const ext = mimeType[mimeType.length-1];
        return profileImageUncropped ? new File([profileImageUncropped], (profileImageUncropped as any)?.name + `.${ext}`, { type }) : null;
    };

    const onFinish = async (values: any) => {
        toggleLoader(true);
        const payload = new FormData();
        Object.keys(values).forEach((name: string) => {
            // console.log(values[name as keyof typeof values]);
            if (name !== "banner") {
                if (name === "startDate" || name === "endDate") {
                    payload.append(name, values[name as keyof typeof values].format('YYYY-MM-DD'))
                } else {
                    payload.append(name, values[name as keyof typeof values])
                }
            }
        });
        if (values.banner) {
            const file = await getImageUrl();
            if (file) {
                payload.append("bannerImage", file);
            }
        }
        postRequest({ url: "/events/new", payload, isFormData: true,})
        .then((res) => {
            handleCancel && handleCancel(true);
            message.success("Event added successfully");
            toggleLoader(false);
        })
        .catch((err) => {
            message.error("Failed to add Result!");
            toggleLoader(false);
        });
    };

    const onFileChange = (e: any) => {
        setProfileFile(e?.fileList?.length ? e.file : null);
    };

    const disabledDate = (current: any) => {
        const currentDate = current.format('YYYY-MM-DD');
        return current && moment(currentDate, 'YYYY-MM-DD').isBefore(moment().format('YYYY-MM-DD'));
    };

    useEffect(() => {
        if (form) {
            form?.resetFields();
            setProfileFile(null);
        }
    }, [isOpen, form]);

    return (
        <Drawer
            title={`Add/Edit Events`}
            placement="right"
            width={width}
            visible={isOpen}
            getContainer={false}
            onClose={() => handleCancel ? handleCancel(false) : undefined}
            footer={
                <Space align="end" wrap className="d-flex justify-content-end">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" onClick={onSubmit}>
                        Save
                    </Button>
                </Space>
            }
        >
            <Spin spinning={loading}>
                {
                    isOpen &&
                    <>
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
                                label="Event Name"
                                name="eventName"
                                rules={[{ required: true, message: 'Please input the Event Name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Start Date"
                                name="startDate"
                                rules={[{ required: true, message: 'Please input the Start Date!' }]}
                            >
                                <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
                            </Form.Item>
                            <Form.Item
                                label="End Date"
                                name="endDate"
                                rules={[{ required: true, message: 'Please input the End Date!' }]}
                            >
                                <DatePicker style={{ width: '100%' }} disabledDate={disabledDate} />
                            </Form.Item>
                            <Form.Item label="Banner">
                                <Form.Item
                                    label="Upload the Banner"
                                    name="banner"
                                    valuePropName="fileList"
                                    getValueFromEvent={normFile}
                                    noStyle
                                    rules={[{ required: true, message: 'Banner is required!' }]}
                                >
                                    <Upload.Dragger
                                        name="files"
                                        beforeUpload={beforeUpload}
                                        maxCount={1}
                                        onChange={onFileChange}
                                    >
                                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                    </Upload.Dragger>
                                </Form.Item>
                            </Form.Item>
                        </Form>
                    </>
                }
            </Spin>
        </Drawer>
    )
}