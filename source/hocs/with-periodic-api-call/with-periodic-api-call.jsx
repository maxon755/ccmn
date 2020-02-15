import React from "react";
import { useEffect, useState } from "react";

/**
 * @param WrappedComponent ReactComponent
 * @param apiCall function
 * @param interval int
 */
const WithPeriodicApiCall = (WrappedComponent, apiCall, interval = 20000) => {

    return () => {
        const [data, setData] = useState([]);

        const performRequest = () => apiCall().then(data => setData(data));

        useEffect(() => {
            performRequest();
            const counterId = setInterval(performRequest, interval);

            return () => clearInterval(counterId);
        }, []);

        return <WrappedComponent data={data} />
    }
};

export default WithPeriodicApiCall;
