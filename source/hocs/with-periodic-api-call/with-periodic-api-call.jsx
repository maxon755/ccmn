import React from "react";
import { useEffect, useState } from "react";

/**
 * @param WrappedComponent ReactComponent
 * @param apiCall function
 * @param interval int
 */
const WithPeriodicApiCall = (WrappedComponent, apiCall, interval = 5000) => {

    const WithPeriodicApiCall = (props) => {
        const [data, setData] = useState(null);

        const performRequest = () => apiCall(props).then(data => setData(data));

        useEffect(() => {
            performRequest();
            const counterId = setInterval(performRequest, interval);

            return () => clearInterval(counterId);
        }, []);

        return (
            <div>
                {data ? <WrappedComponent {...data} {...props} /> : <div />}
            </div>
        )
    };

    return WithPeriodicApiCall;
};

export default WithPeriodicApiCall;
