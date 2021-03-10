import axios from "axios";
import { config } from './config';


export class Request {

    async get(url: string) {
        let response = await axios.get(`${config.serverURL}${url}`)
        return response.data;
    }

    async post(url: string, payload) {
        let response = await axios.post(`${config.serverURL}${url}`,payload)
        return response.data;
    }
}
