import React from "react";
import { useEffect, useState } from "react";

const WithApiCall = (WrappedComponent, apiCall) => {

    return () => {
        const [data, setData] = useState(null);

        useEffect(() => {
            apiCall().then(data => setData(data))
        });

        return (
            <div>
                <WrappedComponent data={data} />
            </div>
        )
    }
};

export default WithApiCall;
