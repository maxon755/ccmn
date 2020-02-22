import React from 'react';
import CmxClient from '../../servises/CmxClient';
import WithApiCall from '../../hocs/with-api-call';
import ClientsLocation from '../../components/clients-location'
import ClientsStatus from "../../components/clients-status";

const ThirdFloorPage = (props) => {

    return (
        <div>
            <ClientsStatus floorId={props.floorData.aesUidString} />
            <ClientsLocation floorId={props.floorData.aesUidString} imageData={props.floorData.image} />
        </div>
    );
};

export default WithApiCall(
    ThirdFloorPage, () => CmxClient.getInstance().getFloorData(3)
);
