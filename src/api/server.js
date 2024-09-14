import axios from 'axios';
import { serverUrl } from '../config.js';

export const serverInfo = async(serverCode) => {
    let response = await axios.get(`${serverUrl}/${serverCode}`);
    return response.data;
}