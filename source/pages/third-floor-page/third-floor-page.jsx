import React from 'react';
import CmxClient from '../../servises/CmxClient';
import WithApiCall from '../../hocs/with-api-call';
import ClientsLocation from '../../components/clients-location'

const ThirdFloorPage = (props) => {

    return (
        <ClientsLocation floorId={props.floorData.aesUidString} imageData={props.floorData.image} />
    );
};

export default WithApiCall(
    ThirdFloorPage, () => CmxClient.getInstance().getFloorData(3)
);
