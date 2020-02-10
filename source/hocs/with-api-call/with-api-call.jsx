import React from "react";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";

const WithApiCall = (WrappedComponent, apiCall, interval = 20000) => {

    return () => {
        const [data, setData] = useState();

        const performRequest = () => apiCall().then(data => setData(data));

        useEffect(() => {
            performRequest();
            const counterId = setInterval(performRequest, interval);

            return () => clearInterval(counterId);
        });

        return (
            <div>
                {data ? <WrappedComponent data={data} /> : <Spinner width={18} />}
            </div>
        )
    }
};

export default WithApiCall;
