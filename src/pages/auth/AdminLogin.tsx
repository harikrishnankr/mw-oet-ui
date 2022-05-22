import { UserType } from "../../core/constants/common";
import { Login } from "../../core/login/Login";

export default function AdminLogin() {
    return (
        <Login type={UserType.Admin}/>
    );
}
