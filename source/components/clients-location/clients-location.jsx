import React, { useState } from 'react';
import WithApiCall from '../../hocs/with-api-call';
import CmxClient from '../../servises/CmxClient';
import WithPeriodicApiCall from '../../hocs/with-periodic-api-call';
import { Image, Layer, Circle, Stage } from 'react-konva';
import ClientDataTable from "../client-data-table";


const scaleImage = image => {
    const ratio = 1200 / image.width;
    image.width *= ratio;
    image.height *= ratio;

    return image;
};

const computeClientsLocation = (image, clientsData, clickHandler) => {

    return clientsData.map(clientData => {
        const scaleWidth = image.width / clientData.mapInfo.floorDimension.width;
        const scaleHeight = image.height / clientData.mapInfo.floorDimension.length;

        return (
            <Circle
                onClick={() => {
                    clickHandler(clientData);
                }}
                key={clientData.macAddress}
                x={clientData.mapCoordinate.x * scaleWidth}
                y={clientData.mapCoordinate.y * scaleHeight}
                radius={7}
                fill={clientData.dot11Status === 'ASSOCIATED' ? 'blue' : 'red'}
                stroke={'black'}
                strokeWidth={1}
            />
        )});

};

const ClientsLocation = (props) => {

    const [clientData, setClientData] = useState(null);

    const image = scaleImage(props.image);

    const handleClick = (data) => {
        setClientData(data)
    };

    return (
        <div>
            <Stage id={'floorMap'} width={image.width} height={image.height}>
                <Layer>
                    <Image
                        x={0}
                        y={0}
                        image={props.image}
                    />
                    {computeClientsLocation(image, props.clientsData, handleClick)}
                </Layer>
            </Stage>
            {clientData ? <ClientDataTable clientData={clientData}/> : ''}
        </div>
    )
};

const WithImage = WithApiCall(ClientsLocation, (props) => {
    return CmxClient.getInstance().getFloorImage(props.imageData.imageName)
});

export default WithPeriodicApiCall(WithImage, (props) => {
    return CmxClient.getInstance().getClientsData(props.floorId)
});
