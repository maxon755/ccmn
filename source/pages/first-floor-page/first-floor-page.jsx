import React from 'react';
import CmxClient from '../../servises/CmxClient';
import WithApiCall from '../../hocs/with-api-call';
import ClientsLocation from '../../components/clients-location'

const FirstFloorPage = (props) => {

    return (
        <div>
            First Floor Page
            <ClientsLocation floorId={props.floorData.aesUidString} imageData={props.floorData.image} />
        </div>

    );
};

export default WithApiCall(
    FirstFloorPage, () => CmxClient.getInstance().getFloorData(1)
);
