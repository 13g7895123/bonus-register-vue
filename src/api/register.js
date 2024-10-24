import axios from 'axios';
import { registerUrl } from '../config.js';

export const register = async(data) => {
    let response = await axios.post(`${registerUrl}`, data);
    return response.data;
}