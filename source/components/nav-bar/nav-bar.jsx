import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import {makeStyles} from '@material-ui/core/styles';
import TotalDevices from "../total-devices";

const useStyles = makeStyles(theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },

    toolBar: {
        'justifyContent': 'space-between',
    },

}));

export default function NavBar() {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" noWrap>
                    CCMN
                </Typography>
                <TotalDevices />
            </Toolbar>
        </AppBar>
    )
}
