export const fetchEmails = async (token, limit, offset) => {
    const response = await fetch(
        `http://68.183.74.14:4005/api/emails/?limit=${limit}&offset=${offset}`,
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
        'http://68.183.74.14:4005/api/emails/',
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