import React from 'react';
import Typography from '@material-ui/core/Typography';
import WithApiCall from '../../hocs/with-api-call'
import CiscoLocationService from "../../servises/CiscoLocationService";

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
    return CiscoLocationService.create().getTotalConnectedDevicesCount();
});
