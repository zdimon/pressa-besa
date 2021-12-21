import axios from "axios";
import { config } from './config';


export class Request {
    
    config: any;
    constructor() {
        if(window.localStorage.getItem('token')) {
            this.config =  { headers: { Authorization: `Token ${window.localStorage.getItem('token')}` }};
        } else {
            this.config = {};
        }
    }
     

    

    async get(url: string) {
        let response = await axios.get(`${config.serverURL}${url}`, this.config)
        return response.data;
    }

    async post(url: string, payload) {
        let response = await axios.post(`${config.serverURL}${url}`,payload, this.config)
        return response.data;
    }
}
