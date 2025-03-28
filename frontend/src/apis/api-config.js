const host = 'localhost:3000'; // Replace with your API host
const apiRoot = `http://${host}/api/`;


export const get = async (path, options) => {
    const response = await fetch(apiRoot + path, options);
    return response.json();
}

export const post = async (path, data, options) => {
    const response = await fetch(apiRoot + path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...options,
    });
    return response.json();
}