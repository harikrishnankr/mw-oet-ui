import { Form, Input, message, Select, Spin, TimePicker } from "antd";
import Modal from "antd/lib/modal/Modal";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { postRequest } from "../../core/apiService";

const { Option } = Select;

interface IAddSlots {
    isOpen: boolean;
    toggleModal: () => void;
}

export function AddSlots({ isOpen, toggleModal }: IAddSlots) {
    const [form] = Form.useForm();
    const [loading, toggleLoader] = useState(false);
    const weekDays = useMemo(() => moment.weekdays(), []);

    const onSuccess = () => {
        form.submit();
    };

    const handleCancel = () => {
        toggleModal();
    };

    const onSubmit = (values: any) => {
        toggleLoader(true);
        postRequest({ url: "/slot/create", payload: { day: values.day } })
        .then(() => {
            toggleLoader(false);
            toggleModal();
            message.success("Successfully added time slot");
        })
        .catch(() => {
            toggleLoader(false);
            message.error("Couldn't add slot");
        });
    };

    useEffect(() => {
        if (form) {
            form.resetFields();
        }
    }, [isOpen, form]);

    return (
        <Modal title="Add Slots" visible={isOpen} onOk={onSuccess} onCancel={handleCancel} width={320} className="Add-slot__wrapper">
            <Spin spinning={loading}>
                <Form
                    layout="vertical"
                    form={form}
                    name="addSlots"
                    onFinish={onSubmit}
                    scrollToFirstError
                    className="mt-3"
                >
                    <div className="container">
                        <div className="row">
                            {/* <div className="col-md-12">
                                <Form.Item
                                    label="Event Name Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input the Event Name!' }]}
                                >
                                    <Input placeholder="Enter the Event Name" />
                                </Form.Item>
                            </div> */}
                            <div className="col-md-12">
                                <Form.Item name="day" label="Day" rules={[{ required: true, message: 'Please select the Weekday' }]}>
                                    <Select placeholder="Select the Weekday">
                                        {
                                            weekDays.map((day, i) => (
                                                <Option value={i+1} key={i+1}>{day}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </div>
                            {/* <div className="col-md-6">
                                <Form.Item name="slot" label="Time Slot" rules={[{ required: true, message: 'Please select the time slot' }]}>
                                    <TimePicker.RangePicker format="hh:mm a" />
                                </Form.Item>
                            </div> */}
                        </div>
                    </div>
                </Form>
            </Spin>
        </Modal>
    )
}