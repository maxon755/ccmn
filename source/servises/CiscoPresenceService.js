import axios from 'axios';

let instance;

export default class CiscoPresenceService {

    constructor() {
        if (instance) {
            throw "Instantiation failed: use CiscoPresenceService.getInstance() instead of new."
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

    setSignal(signal) {
        this.signal = signal;
    }

    static getInstance() {
        if (!instance) {
            instance = new CiscoPresenceService();
        }

        return instance;
    }


    getTotalVisitors(startDate, endDate)
    {
        return this.get('visitor/total', {
            startDate,
            endDate
        }).then(data => {

            return {
                totalVisitors: data
            };
        })
    }

    get(url, params = {}, version = 1) {
        return this.axios({
            method: 'get',
            url: '/v' + version + '/' + url,
            params: {
                ...params,
                siteId: this.siteId,
            },
            ...this.signal && {cancelToken: this.signal.token},
        }).then(response => response.data);
    }
}
