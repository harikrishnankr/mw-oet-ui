import { HttpRequestHeader } from "antd/lib/upload/interface";
import { BASE_API_ENDPOINT } from "./constants/common";
import { getBaseEndPoint, getToken, isLoggedIn } from "./utils";

export interface IPostRequest {
    url: string;
    payload?: any;
    header?: HttpRequestHeader;
    isFormData?: boolean;
    skipAuth?: boolean;
}


const sendPostAPI = ({ url, payload, header, isFormData }: IPostRequest) => {
    return fetch(`${getBaseEndPoint()}${url}`, {
        method: 'POST',
        body: isFormData ? payload : JSON.stringify(payload),
        ...(header ? { headers: header } : {})
    })
    .then(res => res.json())
    .then(res => {
        if (res.success) {
            return res;
        } else if (res.error) {
            throw res;
        }
    });
};

export const postRequest = ({ url, payload, header, isFormData, skipAuth }: IPostRequest) => {

    const token = isLoggedIn() ? getToken() : '';
    const fetchHeader: HttpRequestHeader = {
        ...(!isFormData ? { 'Content-Type': 'application/json' } : {} ),
        ...(!skipAuth ? { "Authorization": token } as HttpRequestHeader : {}),
        ...(header?  header : {})
    };

    return sendPostAPI({ url, payload, header: fetchHeader, isFormData });
};
