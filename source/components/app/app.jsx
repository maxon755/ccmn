import React from 'react';
import CiscoPresenseService from '../../Servises/CiscoPresenceService';
import CiscoLocationService from "../../Servises/CiscoLocationService";


const App = () => {

    (CiscoLocationService.create()).getConnectedDevicesCount(1)
        .then(res => console.log(res));

    return ('APP WORKS');
};

export default App;
