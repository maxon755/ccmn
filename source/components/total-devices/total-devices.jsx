import React from 'react';
import Typography from '@material-ui/core/Typography';
import WithApiCall from '../../hocs/with-api-call'
import CmxClient from "../../servises/CmxClient";

const TotalDevices = (props) => {

    return (
        <div>
            <Typography variant="h6" noWrap>
                Total Connected Devices: {props.data}
            </Typography>
        </div>
    );
};

export default WithApiCall(TotalDevices, () => {
    return CmxClient.getInstance().getTotalConnectedDevicesCount();
});
