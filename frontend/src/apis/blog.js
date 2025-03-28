import { get, post } from './api-config';

export const getBlogs = async () => {
    return await get('blogs');
}

export const createComment = async (data) => {
    return await post('blogs/comment', data);
}