import { UserType } from "../../core/constants/common";
import { Login } from "../../core/login/Login";

export default function StudentLogin() {
    return (
        <Login type={UserType.Student}/>
    );
}
