import {
    Form,
    Input,
    Button,
    Radio,
    Divider
} from 'antd';
import { useState } from 'react';
import Questions from "../../core/constants/questions";
import { isMobileDevice } from '../../core/utils';
import { TermsAndCondition } from './TermsAndCondition';

export function Assessment({ formData, onSubmit, previous }: { formData: any, onSubmit: (t: any) => any, previous: (t: any) => any }) {
    const [form] = Form.useForm();
    const isMobile = isMobileDevice();
    const [isTNCOpen, setTNCOpen] = useState(false);
    const [submittedData, setSubmittedData] = useState({});

    const onFinish = (values: any) => {
        setSubmittedData(values);
        setTNCOpen(true);
    };

    const onTNCAccept = () => {
        //API Call
        onSubmit && onSubmit(submittedData);
        setTNCOpen(false);
    };

    return (
        <>
            <TermsAndCondition isOpen={isTNCOpen} accept={onTNCAccept} decline={() => setTNCOpen(false)} />
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
                        <div className="col-md-12">
                            <h4 className="title">Please answer these questions without referring to the internet or asking anyone. This part is very important for us to understand your level of English.</h4>
                        </div>
                        <div className="col-md-12 mt-3">
                            <Divider orientation={ !isMobile ? "left": "center" }>Rearrange the words into a sentence</Divider>
                        </div>
                        {
                            Questions.rearrange.map((q: any, index: number) => (
                                <div className="col-md-12" key={index}>
                                    <Form.Item
                                        name={`rearrange_${index+1}`}
                                        label={q.question}
                                        rules={[{ required: true, message: 'This field is required!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            ))
                        }
                        <div className="col-md-12 mt-3">
                            <Divider orientation={ !isMobile ? "left": "center" }>Fill in the blanks</Divider>
                        </div>
                        {
                            Questions.fillInTheBlanks.map((q: any, index: number) => (
                                <div className="col-md-6" key={index}>
                                    <Form.Item name={`fillInTheBlanks_${index+1}`} label={q.question} rules={[{ required: true, message: 'This field is required!' }]}>
                                        <Radio.Group>
                                            {
                                                q.options.map((o: any, oIndex: number) => (
                                                    <Radio value={o} key={oIndex}>{o}</Radio>
                                                ))
                                            }
                                        </Radio.Group>
                                    </Form.Item>
                                </div>
                            ))
                        }
                        <div className="col-md-12 mt-3">
                            <Divider orientation={ !isMobile ? "left": "center" }>Translate the given sentences into English</Divider>
                        </div>
                        {
                            Questions.translate.map((q: any, index: number) => (
                                <div className="col-md-12" key={index}>
                                    <Form.Item
                                        name={`translate_${index+1}`}
                                        label={q.question}
                                        rules={[{ required: true, message: 'This field is required!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            ))
                        }
                        <div className="col-md-12 mt-3">
                            <Divider orientation={ !isMobile ? "left": "center" }>Find the mistake in the sentence</Divider>
                        </div>
                        {
                            Questions.findMistake.map((q: any, index: number) => (
                                <div className="col-md-12" key={index}>
                                    <Form.Item
                                        name={`findMistake_${index+1}`}
                                        label={q.question}
                                        rules={[{ required: true, message: 'This field is required!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </div>
                            ))
                        }
                        <div className="col-md-12 d-flex justify-content-end mt-3">
                            <Form.Item>
                                <Button type="primary" size="large" ghost onClick={previous}>
                                    Previous
                                </Button>
                                <Button type="primary" htmlType="submit" size="large" className="ml-3">
                                    Submit
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    )
}
