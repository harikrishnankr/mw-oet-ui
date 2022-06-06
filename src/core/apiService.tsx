import { HttpRequestHeader } from "antd/lib/upload/interface";
import { BASE_API_ENDPOINT } from "./constants/common";
import { getBaseEndPoint, getToken, isLoggedIn } from "./utils";

export interface IPostRequest {
    url: string;
    payload?: any;
    header?: HttpRequestHeader;
    isFormData?: boolean;
    skipAuth?: boolean;
    method?: string;
}

const sendAPI = ({ url, payload, header, isFormData, method }: IPostRequest) => {
    return fetch(`${getBaseEndPoint()}${url}`, {
        method: method || 'GET',
        ...((method && payload) ? { body: isFormData ? payload : JSON.stringify(payload) } : {}),
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

    return sendAPI({ url, payload, header: fetchHeader, isFormData, method: 'POST' });
};

export const getRequest = ({ url, payload, header, skipAuth }: IPostRequest) => {
    const token = isLoggedIn() ? getToken() : '';
    const fetchHeader: HttpRequestHeader = {
        'Content-Type': 'application/json',
        ...(!skipAuth ? { "Authorization": token } as HttpRequestHeader : {}),
        ...(header?  header : {})
    };

    return sendAPI({ url, payload: null, header: fetchHeader });
};

export const deleteRequest = ({ url, payload, header, skipAuth }: IPostRequest) => {
    const token = isLoggedIn() ? getToken() : '';
    const fetchHeader: HttpRequestHeader = {
        'Content-Type': 'application/json',
        ...(!skipAuth ? { "Authorization": token } as HttpRequestHeader : {}),
        ...(header?  header : {})
    };

    return sendAPI({ url, payload, header: fetchHeader, method: 'DELETE' });
};
