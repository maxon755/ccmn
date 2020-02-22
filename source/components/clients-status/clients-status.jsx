import React from 'react';
import WithPeriodicApiCall from '../../hocs/with-periodic-api-call';
import CmxClient from '../../servises/CmxClient';
import { Paper } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({

    root: {
        width: 1000,
        display: 'flex',
    },
    paper: {
        padding: 8,
        margin: 10
    },
});

const ClientsStatus = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography align='center' component='p'>
                    Total devices: {props.totalClients}
                </Typography>
            </Paper>


            <Paper elevation={3} className={classes.paper}>
                <Typography align='center' component='p'>
                    Associated clients: {props.associatedClients}
                </Typography>
            </Paper>

            <Paper elevation={3} className={classes.paper}>
                <Typography align='center' component='p'>
                    Probing only clients: {props.probingOnlyClients}
                </Typography>
            </Paper>
        </div>
    )

};

export default WithPeriodicApiCall(ClientsStatus, (props) => {
    return Promise.all([
        CmxClient.getInstance().getConnectedDevicesCount(props.floorId),
        CmxClient.getInstance().getConnectedDevicesCount(props.floorId, true),
    ]).then(result => {
        const totalClients = result[0].clientsCount;
        const associatedClients = result[1].clientsCount;
        const probingOnlyClients = totalClients - associatedClients;

        return {
            totalClients,
            associatedClients,
            probingOnlyClients
        }
    });
})
