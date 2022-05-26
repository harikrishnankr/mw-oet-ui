export const postRequest = (url: string, body: any) => {
    return fetch(url, {
        method: 'POST',
        body
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