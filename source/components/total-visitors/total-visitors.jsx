import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Typography from "@material-ui/core/Typography";
import CiscoPresenceService from "../../servises/CiscoPresenceService";
import WithTriggeredApiCall from "../../hocs/with-triggered-api-call";

const useStyles = makeStyles(() => ({

    'paper': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 200,
        height: 80,
        backgroundColor: 'lightGreen'
    },

    'text': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: 10
    }
}));

const TotalVisitors = ({totalVisitors}) => {

    const classes = useStyles();

    return (
        <div>
            <Paper variant="outlined" className={classes.paper}>
                <PermIdentityIcon style={{ fontSize: 60 }} />

                <div className={classes.text}>
                    <Typography variant="h5" noWrap>
                        {totalVisitors}
                    </Typography>
                    <Typography variant="subtitle1" noWrap>
                        Total visitors
                    </Typography>
                </div>
            </Paper>
        </div>
    )
};

export default WithTriggeredApiCall(TotalVisitors, ({date}) => {
    return CiscoPresenceService.getInstance().getTotalVisitors(date.startDate, date.endDate);
});
