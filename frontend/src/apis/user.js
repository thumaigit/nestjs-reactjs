import { get, post } from './api-config';

export const login = async (username, password) => {
    return await post('users/login', { username, password });
}

export const getProfile = async (userId) => {
    return await get(`users/${userId}`);
}