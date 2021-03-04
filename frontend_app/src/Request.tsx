import axios from "axios";

const serverUrl = 'http://localhost:7777/v1/quiz/';

export class Request {

    async get(url: string) {
        let response = await axios.get(`${serverUrl}${url}`)
        return response.data;
    }
} 