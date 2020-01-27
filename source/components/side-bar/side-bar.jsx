import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    link: {
        color: 'black',
        textDecoration: 'none',
    }
}));

export default function SideBar() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.toolbar} />
            <List>
                <Link to="/first-floor" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                        <ListItemText primary={'First Floor'} />
                    </ListItem>
                </Link>

                <Link to="/second-floor" className={classes.link}>
                    <ListItem button>
                        <ListItemIcon>{<InboxIcon />}</ListItemIcon>
                        <ListItemText primary={'Second Floor'} />
                    </ListItem>
                </Link>
            </List>

            <Divider />

        </Drawer>
    );
}
