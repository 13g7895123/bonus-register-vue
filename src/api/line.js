import axios from 'axios';
import { stateUrl } from '../config.js';

export const saveStateApi = async(data) => {
    let response = await axios.post(`${stateUrl}`, data);
    return response.data;
}