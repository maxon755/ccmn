import React from 'react';
import Typography from '@material-ui/core/Typography';
import WithPeriodicApiCall from '../../hocs/with-periodic-api-call'
import CmxClient from "../../servises/CmxClient";

const TotalDevices = (props) => {

    return (
        <div>
            <Typography variant="h6" noWrap>
                Total Connected Devices: {props.totalConnectedDevices}
            </Typography>
        </div>
    );
};

export default WithPeriodicApiCall(TotalDevices, () => {
    return CmxClient.getInstance().getTotalConnectedDevicesCount();
});
