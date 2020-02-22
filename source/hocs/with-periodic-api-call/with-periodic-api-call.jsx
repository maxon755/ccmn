import React from "react";
import { useEffect, useState } from "react";
import CmxClient from "../../servises/CmxClient";

/**
 * @param WrappedComponent ReactComponent
 * @param apiCall function
 * @param interval int
 */
const WithPeriodicApiCall = (WrappedComponent, apiCall, interval = 5000) => {

    const WithPeriodicApiCall = (props) => {
        const [data, setData] = useState(null);


        const abortController = new AbortController();
        const signal = abortController.signal;

        CmxClient.getInstance().setSignal(signal);

        const performRequest = () => apiCall(props).then(data => setData(data));

        useEffect(() => {
            performRequest();
            const counterId = setInterval(performRequest, interval);

            return () => {
                abortController.abort();
                clearInterval(counterId);
            }
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
