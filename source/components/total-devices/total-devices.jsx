import React from 'react';
import Typography from '@material-ui/core/Typography';
import WithPeriodicApiCall from '../../hocs/with-periodic-api-call'
import CmxClient from "../../servises/CmxClient";

const TotalDevices = (props) => {

    return (
        <Typography variant="h6" noWrap>
            Connected Devices: {props.totalConnectedDevices}
        </Typography>
    );
};

export default WithPeriodicApiCall(TotalDevices, () => {
    return CmxClient.getInstance().getTotalConnectedDevicesCount();
});
