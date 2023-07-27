export const signup = async (userData) => {
    const response = await fetch(
        'http://68.183.74.14:4005/api/users/',
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ZnNfdGVzdF80OnROa3RTZ00zVkZxOQ==`
            },
            body: JSON.stringify(userData),
        }
    );
    return { status: response.status, data: await response.json() };
};

export const login = async (userData) => {
    const token = btoa(`${userData.username}:${userData.password}`);
    const response = await fetch(
        'http://68.183.74.14:4005/api/users/current',
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
        'http://68.183.74.14:4005/api/users/current',
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