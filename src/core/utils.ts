import { TOKEN_KEY } from "./constants/common";

export const getBaseEndPoint = () => location.protocol+"//"+location.hostname+":3001";

export const isMobileDevice = () => {
    return window.innerWidth < 768
};

export const setData = (key: string, data: any) => localStorage.setItem(key, JSON.stringify(data));
export const getData = (key: string) => JSON.parse(localStorage.getItem(key) as string);
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const isLoggedIn = () => !!getToken();
