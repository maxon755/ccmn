import React from "react";
import { useEffect, useState } from "react";

/**
 * @param WrappedComponent ReactComponent
 * @param apiCall function
 */
const WithApiCall = (WrappedComponent, apiCall) => {

    const WithApiCall = (props) => {
        const [data, setData] = useState(null);

        useEffect(() => {
            apiCall(props).then(data => setData(data));
        }, []);

        return (
            <div>
                {data ? <WrappedComponent {...data} {...props} /> : <div />}
            </div>
        )
    };

    return WithApiCall;
};

export default WithApiCall;
