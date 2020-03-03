import React from "react";
import { useEffect, useState } from "react";

const WithTriggeredApiCall = (WrappedComponent, apiCall) => {

    const WithTriggeredApiCall = (props) => {
        const [data, setData] = useState(null);

        useEffect(() => {
            apiCall(props).then(data => setData(data));
        }, [props]);

        return (
            <div>
                {data ? <WrappedComponent {...data} {...props} /> : <div />}
            </div>
        )
    };

    return WithTriggeredApiCall;
};

export default WithTriggeredApiCall;
