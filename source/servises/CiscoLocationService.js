import axios from 'axios';

let instance;

export default class CiscoLocationService {

    constructor() {
        if (instance) {
            throw "Instantiation failed: use CiscoLocationService.create() instead of new."
        }

        const user = process.env.CISCO_LOCATION_LOGIN;
        const password = process.env.CISCO_LOCATION_PASSWORD;

        this.axios = axios.create({
            baseURL: process.env.CISCO_LOCATION_URL,
            headers: {
                Authorization: 'Basic ' + btoa(user + ':' + password)
            },
        });

        this.floors = {
            1: '735495909441273878',
            2: '735495909441273979',
            3: '735495909441273980',
        }
    }

    static create() {
        if (!instance) {
            instance = new CiscoLocationService();
        }

        return instance;
    }

    /**
     * Get count of connected devices on specified floor
     *
     * @param floor int
     *
     * @returns Promise
     */
    getConnectedDevicesCount(floor) {
        if (!this.floors.hasOwnProperty(floor)) {
            throw 'Wrong floor number: ' + floor + '; Choose on of [1, 2, 3]';
        }

        return this.get('clients/count', {
            floorRefId: this.floors[floor],
            dot11Status: 'ASSOCIATED',
        })
            .then(response => response.count);
    }

    getTotalConnectedDevicesCount() {
        return Promise.all([
            this.getConnectedDevicesCount(1),
            this.getConnectedDevicesCount(2),
            this.getConnectedDevicesCount(3)
        ]).then(values => {
            return values.reduce((sum, value) => {
                return sum + value
            }, 0);
        });
    }

    get(url, params = {}, version = 1) {
        return this.axios({
            method: 'get',
            url: `/v${version}/` + url,
            params: {
                ...params,
            }
        }).then(response => response.data);
    }
}
