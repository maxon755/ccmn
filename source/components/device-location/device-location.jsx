import React from 'react';
import WithApiCall from '../../hocs/with-api-call';
import CmxClient from '../../servises/CmxClient';

const DeviceLocation = (props) => {

    return (
        <div>
            <img src={props.image} width={1000}/>
        </div>
    )
};

export default WithApiCall(DeviceLocation, (props) => {
    return CmxClient.getInstance().getFloorImage(props.imageData.imageName)
});
