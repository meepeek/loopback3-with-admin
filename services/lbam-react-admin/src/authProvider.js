import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin'

export default (loginApiUrl, noAccessPage = '/login') => {

    return (type, params) => {
        if (type === AUTH_LOGIN) {
            const request = new Request(loginApiUrl, {
                method: 'POST',
                body: JSON.stringify(params),
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            return fetch(request)
                .then(response => {
                    if (response.status < 200 || response.status >= 300) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(({ token, ...data }) => {
                    localStorage.setItem('lbtoken', token);
                });
        }
        if (type === AUTH_LOGOUT) {
            localStorage.removeItem('lbtoken');
            return Promise.resolve();
        }
        if (type === AUTH_ERROR) {
            const status  = params.message.status;
            if (status === 401 || status === 403) {
                localStorage.removeItem('lbtoken');
                return Promise.reject();
            }
            return Promise.resolve();
        }
        if (type === AUTH_CHECK) {
            const token = localStorage.getItem('lbtoken');
            if (token) {
                return Promise.resolve();
            } else {
                localStorage.removeItem('lbtoken');
                return Promise.reject({ redirectTo: noAccessPage });
            }
        }
        return Promise.reject('Unknown method');
    };
};
