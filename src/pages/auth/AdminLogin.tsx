import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { postRequest } from "../../core/apiService";
import { APP_BASE_ROUTE, UserType, USER_DATA } from "../../core/constants/common";
import { Login } from "../../core/login/Login";
import { setData, setToken } from "../../core/utils";

export default function AdminLogin() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigate();

    const login = (values: any) => {
        console.log(values);
        setLoading(true);
        postRequest({ url: "/admin/login", payload: { ...values }, skipAuth: true })
        .then((res) => {
            const {
                userId,
                fullName,
                email,
                role,
                token
            } = res.data;
            setToken(token);
            setData(USER_DATA, { userId, fullName, email, role });
            setLoading(false);
            navigation(APP_BASE_ROUTE);
            message.success(res.message || "Failed to login");
        })
        .catch((err) => {
            message.error(err.message || "Failed to login");
            setLoading(false);
        });
    };

    return (
        <Login type={UserType.Admin} onSubmit={login} loading={loading}/>
    );
}
