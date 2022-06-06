import moment from "moment";
import { DATE_FORMAT, TOKEN_KEY } from "./constants/common";

export const getBaseEndPoint = () => window.location.protocol+"//"+window.location.hostname+":3001";
export const getBaseDocumentEndPoint = () => window.location.protocol+"//"+window.location.hostname+":3001/documents/";

export const isMobileDevice = () => {
    return window.innerWidth < 768;
};

export const isTabletDevice = () => {
    return window.innerWidth <= 991;
};

export const setData = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));
export const getData = (key: string) => JSON.parse(localStorage.getItem(key) as string);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const isLoggedIn = () => !!getToken();
export const formatDate = (date: string) => {
    return moment(date).format(DATE_FORMAT);
};
