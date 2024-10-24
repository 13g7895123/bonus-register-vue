import axios from 'axios';
import { accountUrl, passwordUrl, transferUrl } from '../config.js';

export const readAccount = async(data) => {
    let response = await axios.post(`${accountUrl}`, data);
    return response.data;
}

export const updatePassword = async(data) => {
    let response = await axios.post(`${passwordUrl}`, data);
    return response.data;
}

export const receiver = async(token) => {
    const data = { token: token };
    let response = await axios.post(`${transferUrl}`, data);
    return response.data;
}