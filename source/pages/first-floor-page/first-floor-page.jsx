import React from 'react';
import CmxClient from '../../servises/CmxClient';
import WithApiCall from '../../hocs/with-api-call';
import TestComponent from '../../components/test-component'

const FirstFloorPage = (props) => {

    return (
        <div>
            First Floor Page
            <TestComponent image={props.data.image} />
        </div>

    );
};

export default WithApiCall(
    FirstFloorPage,
    () => CmxClient.getInstance().getFloorData(1)
);
