import React from 'react';
import CmxClient from "../../servises/CmxClient";

const FirstFloorPage = () => {

    CmxClient.getInstance().getFirstFlourData()
        .then(res => console.log(res));

    return (
        'First Floor Page'
    );
};

export default FirstFloorPage;
