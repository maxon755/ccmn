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
            1: '1st_Floor',
            2: '2nd_Floor',
            3: '3rd_Floor',
        }
    }

    static getInstance() {
        if (!instance) {
            instance = new CmxClient();
        }

        return instance;
    }

    setSignal(signal) {
        this.signal = signal;
    }

    /**
     * Get count of connected devices on specified floor
     *
     * @param floorId int
     *
     * @returns Promise
     */
    getConnectedDevicesCount(floorId, associated) {

        return this.get('location/v1/clients/count', {
            floorRefId: floorId,
            dot11Status: associated ? 'ASSOCIATED' : null,
        })
            .then(response => {
                return {
                    clientsCount: response.count
                }
            });
    }

    getTotalConnectedDevicesCount() {
        return this.get('location/v2/clients/count', {
            dot11Status: 'ASSOCIATED'
        })
            .then(response => {
                return {
                    totalConnectedDevices: response.count
                }
            });
    }

    /**
     * Get general data of the specific floor.
     *
     * @param floor int
     */
    getFloorData(floor) {
        if (!this.floors.hasOwnProperty(floor)) {
            throw 'Wrong floor number: ' + floor + '; Choose on of [1, 2, 3]';
        }

        return this.get(
            'config/v1/maps/info/System%20Campus/UNIT.Factory/' + this.floors[floor]
        ).then(data => { return { floorData: data }});
    }

    /**
     * Get floor image by name
     * @param imageName string
     * @returns Promise
     */
    getFloorImage(imageName) {
        return this.get('config/v1/maps/imagesource/' + imageName, {},'blob')
            .then(blob => {
                return new Promise(resolve => {
                    const reader = new window.FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = () => resolve(reader.result);
                })
            }).then(imageSource => {
                const image = new Image();
                image.src = imageSource;

                return {image}
            })
    }

    getClientsData(floorId) {
        return this.get('location/v1/clients', {
            floorRefId: floorId
        }).then(data => {
            return { clientsData: data }
        })
    }

    get(url, params = {}, responseType) {
        return this.axios({
            method: 'get',
            url: url,
            params: {
                ...params,
            },
            responseType,
            cancelToken: this.signal.token
        }).then(response => response.data);
    }
}
