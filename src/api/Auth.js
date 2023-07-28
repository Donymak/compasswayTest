const API_HOST = process.env.REACT_APP_API_HOST;
export const signup = async (userData) => {
    const response = await fetch(
        `${API_HOST}/users/`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }
    );
    return { status: response.status, data: await response.json() };
};

export const login = async (userData) => {
    const token = btoa(`${userData.username}:${userData.password}`);
    const response = await fetch(
        `${API_HOST}/users/current/`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`,
            }
        }
    );
    return { status: response.status, data: await response.json(), token };
};

export const fetchUserByToken = async (token) => {
    const response = await fetch(
        `${API_HOST}/users/current/`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`,
            }
        }
    );
    return { status: response.status, data: await response.json() };
};