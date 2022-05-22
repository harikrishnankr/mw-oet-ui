import { UserType } from "../../core/constants/common";
import { Login } from "../../core/login/Login";

export default function StaffLogin() {
    return (
        <Login type={UserType.Staff}/>
    );
}
