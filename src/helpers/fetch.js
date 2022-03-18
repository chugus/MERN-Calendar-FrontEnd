const baseUrl = process.env.REACT_APP_API_URL;


export const fetchSinToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url);
    } else {
        return fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

export const fetchConToken = (endpoint, data, method = 'GET') => {
    const url = `${baseUrl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': localStorage.getItem('token')
            }
            });
    } else {
        return fetch(url, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'x-token': localStorage.getItem('token')
            }
        });
    }
}