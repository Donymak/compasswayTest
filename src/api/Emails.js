const API_HOST = process.env.REACT_APP_API_HOST;
export const fetchEmails = async (token, limit, offset) => {
    const response = await fetch(
        `${API_HOST}/emails/?limit=${limit}&offset=${offset}`,
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`,
            },
        }
    );
    return { status: response.status, data: await response.json() };
};

export const createEmail = async (token, emailData) => {
    const response = await fetch(
        `${API_HOST}/emails/`,
        {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Basic ${token}`,
            },
            body: JSON.stringify(emailData),
        }
    );
    return { status: response.status, data: await response.json() };
};