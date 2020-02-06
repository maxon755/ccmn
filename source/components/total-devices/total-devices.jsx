import React from 'react';
import Typography from "@material-ui/core/Typography";
import CiscoLocationService from "../../servises/CiscoLocationService";

class TotalDevices extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            totalDevices: null
        };
    }

    componentDidMount() {
        CiscoLocationService.create()
            .getTotalConnectedDevicesCount()
            .then(totalDevices => this.setState({
                totalDevices: totalDevices
            }));
    }

    render() {
        return (
            <div>
                <Typography variant="h6" noWrap>
                    Total Connected Devices: {this.state.totalDevices}
                </Typography>
            </div>
        );
    }
}

export default TotalDevices;
