import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { getRequest, postRequest } from "../../core/apiService";
import { PageWrapper, toggleSpinner } from "../../core/PageWrapper";
import { isMobileDevice } from "../../core/utils";

export function BankDetails() {
    const [formData, setFormData] = useState({});
    const [form] = Form.useForm();
    const isMobile = isMobileDevice();

    const fetchBankDetails = () => {
        getRequest({ url: "/bank-details" })
        .then((res: any) => {
            setFormData(res.data);
        })
        .catch(() => {
            message.error("Couldn't fetch bank details.");
        });
    };

    useEffect(() => {
        fetchBankDetails();
    }, []);

    useEffect(() => {
        if (form && formData) {
            form?.setFieldsValue({...formData});
        }
    }, [formData, form]);

    const onFinish = (values: any) => {
        toggleSpinner(true);
        const payload = {
            accountHolderName: values.accountHolderName,
            bankName: values.bankName,
            accountNo: values.accountNo,
            branch: values.branch,
            ifsc: values.ifsc,
            upiId: values.upiId
        }
        postRequest({ url: "/bank-details/save", payload })
        .then(() => {
            message.success("Bank details updated successfully successfully");
            toggleSpinner(false);
            fetchBankDetails();
        })
        .catch(() => {
            toggleSpinner(false);
        });
    };

    const cancel = () => {
        form.resetFields();
    };

    return (
        <PageWrapper title="Bank Details" subTitle={!isMobile ? "View and Add Bank Details" : ""}>
            <div className="Leave-request__Wrapper">
                <Form
                    layout="vertical"
                    form={form}
                    name="leaveRequest"
                    onFinish={onFinish}
                    scrollToFirstError
                    initialValues={formData}
                    className="mt-3"
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <Form.Item name="accountNo" label="Account Number" rules={[{ required: true, message: 'Please input the Account Number' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="accountHolderName" label="Account Holder Name" rules={[{ required: true, message: 'Please input the Account Holder Name!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="bankName" label="Bank Name" rules={[{ required: true, message: 'Please input the Bank Name!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="branch" label="Branch" rules={[{ required: true, message: 'Please input the Branch!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="ifsc" label="IFSC" rules={[{ required: true, message: 'Please input the IFSC!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                            <div className="col-md-6">
                                <Form.Item name="upiId" label="UPID" rules={[{ required: true, message: 'Please input the UPID!' }]}>
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex justify-content-end mt-3">
                                <Form.Item>
                                    <Button type="default" onClick={cancel}>Cancel</Button>
                                    <Button type="primary" htmlType="submit" className="ml-3">Save</Button>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </PageWrapper>
    )
}
