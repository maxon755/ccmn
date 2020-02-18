import React from 'react';
import WithApiCall from '../../hocs/with-api-call';
import CmxClient from '../../servises/CmxClient';
import WithPeriodicApiCall from "../../hocs/with-periodic-api-call";
import { Image, Layer, Circle, Stage} from "react-konva";

const ClientsLocation = (props) => {

    console.dir(props);

    const image = props.image;
    const ratio = 1200 / image.width;
    image.width *= ratio;
    image.height *= ratio;

    const clientsLocation = props.clientsData.map( (clientData) => {

        const scaleWidth = image.width / clientData.mapInfo.floorDimension.width;
        const scaleHeight = image.height / clientData.mapInfo.floorDimension.length;

        return (
            <Circle
                key={clientData.macAddress}
                x={clientData.mapCoordinate.x * scaleWidth}
                y={clientData.mapCoordinate.y * scaleHeight}
                radius={5}
                fill={clientData.dot11Status === 'ASSOCIATED' ? 'blue' : 'red'}
            />
        );
    });

    return (
        <Stage width={image.width} height={image.height}>
            <Layer>
                <Image
                    x={0}
                    y={0}
                    image={props.image}
                />
                {clientsLocation}
            </Layer>
        </Stage>
    )
};

const WithImage = WithApiCall(ClientsLocation, (props) => {
    return CmxClient.getInstance().getFloorImage(props.imageData.imageName)
});

export default WithPeriodicApiCall(WithImage, (props) => {
    return CmxClient.getInstance().getClientsData(props.floorId)
});
