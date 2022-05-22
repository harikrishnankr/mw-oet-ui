import { Form, Input, Button } from 'antd';
import { UserType } from '../constants/common';
import LogoColored from "../../assets/images/logo-colored.png";
import "./login.scss";

interface ILogin {
    type: UserType;
}

export function Login({ type }: ILogin) {

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }; 

    return (
        <div className="Login__wrapper">
            <div className="Login">
                <div className="Login__form">
                    <div className="logo">
                        <a href="/"><img src={LogoColored} alt="Logo" /></a>
                    </div>
                    <div className="heading">
                        <h5>
                            Log in to your {type === UserType.Admin ? "Admin" : type === UserType.Staff ? "Staff" : "Student" } account
                        </h5>
                    </div>
                    <Form
                        layout="vertical"
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input size="large" placeholder="Enter your Username"/>
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password size="large" placeholder="Enter your Password" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block size="large" className="mt-4">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <span className="copyright-inner">
                        <p className="text-center">© Copyright <a href="http://manglishworld.com/">Manglish World</a>. All Rights Reserved</p>
                    </span>
                </div>
                <span className="copyright-outer">
                    <p className="text-center">© Copyright <a href="http://manglishworld.com/">Manglish World</a>. All Rights Reserved</p>
                </span>
            </div>
        </div>
    );
}
