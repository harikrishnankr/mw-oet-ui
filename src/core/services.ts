import { useNavigate } from "react-router";
import { NavigateFunction } from "react-router-dom";
import { TOKEN_KEY, USER_DATA } from "./constants/common";
import { getData, isLoggedIn } from "./utils";

export const logout = (navigation: NavigateFunction) => {
    if (isLoggedIn()) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_DATA);
        navigation("/");
    }
};

export const getUserType = () => {
    if (isLoggedIn()) {
        const userData = getData(USER_DATA);

        return userData?.role;
    }

    return null;
};
