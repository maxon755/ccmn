import axios from 'axios';

let instance;

export default class CmxClient {

    constructor() {
        if (instance) {
            throw "Instantiation failed: use CmxClient.getInstance() instead of new."
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

    static getInstance() {
        if (!instance) {
            instance = new CmxClient();
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
        return this.get('location/v2/clients/count', {
            dot11Status: 'ASSOCIATED'
        })
            .then(response => response.count);
    }

    getFirstFlourData() {
        return this.get(
            '/config/v1/maps/info/System%20Campus/UNIT.Factory/1st_Floor'
        );
    }

    get(url, params = {}) {
        return this.axios({
            method: 'get',
            url: url,
            params: {
                ...params,
            }
        }).then(response => response.data);
    }
}