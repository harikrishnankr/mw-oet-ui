import {
    Form,
    Input,
    Select,
    Button,
    Radio,
    DatePicker,
    Upload
} from 'antd';
import moment from 'moment';
import { DATE_FORMAT } from '../../core/constants/common';
import DialCodes from "../../core/constants/dialCodes";

export interface IPersonalInfo {
    fullName?: string;
    email?: string;
    phone?: string;
    gender?: string;
    dob?: string;
    address?: string;
    pinCode?: string;
    prefix?: string;
    idProof?: any;
}

const { Option } = Select;

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 24,
            offset: 0,
        },
    },
};

export function PersonalInfo({ formData, onSubmit }: { formData: IPersonalInfo, onSubmit: (t: any) => any }) {
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        onSubmit && onSubmit(values);
    };

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e && e.fileList;
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{ width: 100 }}
                dropdownMatchSelectWidth={false}
                showSearch
                optionLabelProp="label"
                filterOption={
                    (input: string, option: any): boolean => {
                        return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    }
                }
            >
                {
                    DialCodes.map((code) => <Option value={code.dial_code} key={`${code.name} - ${code.dial_code}`} label={code.dial_code}>
                        {`${code.name} - ${code.dial_code}`}
                    </Option>)
                }
            </Select>
        </Form.Item>
    );

    return (
        <Form
            layout="vertical"
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={formData}
            scrollToFirstError
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <Form.Item
                            name="fullName"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please input your Name!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
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
                    </div>
                    <div className="col-md-4">
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[
                                { required: true, message: 'Please input your phone number!' },
                                () => ({
                                    validator(_, value) {
                                      if (value && isNaN(value)) {
                                        return Promise.reject(new Error('The input is not a valid phone number!'));
                                      }
                                      return Promise.resolve();
                                    }
                                }),
                            ]}
                        >
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="gender" label="Gender" rules={[{ required: true, message: 'Please input your Gender!' }]}>
                            <Radio.Group>
                                <Radio value="male">Male</Radio>
                                <Radio value="gender">Female</Radio>
                                <Radio value="other">Other</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item name="dob" label="Date of Birth" rules={[{ required: true, message: 'Please input your Date of Birth!' }]}>
                            <DatePicker value={formData.dob ? moment(formData.dob, DATE_FORMAT) : null }/>
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item
                            name="address"
                            label="Hometown Address"
                            rules={[{ required: true, message: 'Please enter you Address' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-md-4">
                        <Form.Item
                            name="pinCode"
                            label="Pin Code"
                            rules={[{ required: true, message: 'Please enter the Pin Code!' }]}
                        >
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="col-md-8">
                        <Form.Item label="Upload an Identification and Address Proof">
                            <Form.Item label="Upload an Identification and Address Proof" name="idProof" valuePropName="fileList" getValueFromEvent={normFile} noStyle rules={[{ required: true, message: 'Please enter the Please enter the ID Proof!' }]}>
                                <Upload.Dragger name="files" beforeUpload={() => false} maxCount={1}>
                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                </Upload.Dragger>
                            </Form.Item>
                        </Form.Item>
                    </div>
                    <div className="col-md-12 d-flex justify-content-end mt-3">
                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" size="large">
                                Next
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </Form>
    );
}
