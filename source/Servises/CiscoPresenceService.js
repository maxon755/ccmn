import axios from 'axios';

let instance;

export default class CiscoPresenceService {

    constructor() {
        if (instance) {
            throw "Instantiation failed: use CiscoPresenceService.create() instead of new."
        }

        const user = process.env.CISCO_PRESENCE_LOGIN;
        const password = process.env.CISCO_PRESENCE_PASSWORD;

        this.siteId = process.env.CISCO_PRESENCE_SITE_ID;

        this.axios = axios.create({
            baseURL: process.env.CISCO_PRESENCE_URL,
            headers: {
                Authorization: 'Basic ' + btoa(user + ':' + password)
            },
        })
    }

    static create() {
        if (!instance) {
            instance = new CiscoPresenceService();
        }

        return instance;
    }

    testRequest() {
        return this.get('repeatvisitors/count/today')
    }

    get(url, params = {}, version = 1) {
        return this.axios({
            method: 'get',
            url: `/v${version}/` + url,
            params: {
                ...params,
                siteId: this.siteId
            }
        }).then(response => response.data);
    }

}
