import React from 'react';
import WithApiCall from '../../hocs/with-api-call';
import CmxClient from '../../servises/CmxClient';

const TestComponent = (props) => {

    console.log(props);

    return (
        <div>
            <img src={props.data} width={1000}/>
        </div>
    )
};

export default WithApiCall(TestComponent, (props) => {
    return CmxClient.getInstance().getFloorImage(props.image.imageName)
});
