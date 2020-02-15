import React from 'react';
import WithApiCall from '../../hocs/with-api-call';
import CmxClient from '../../servises/CmxClient';
import WithPeriodicApiCall from "../../hocs/with-periodic-api-call";

const TestComponent = (props) => {

    return (
        <div>
            {props.clientsData.length}
            <img src={props.image}/>
        </div>
    )
};

const WithImage = WithApiCall(TestComponent, (props) => {
    return CmxClient.getInstance().getFloorImage(props.imageData.imageName)
});

export default WithPeriodicApiCall(WithImage, (props) => {
    return CmxClient.getInstance().getClientsData(props.floorId)
});
