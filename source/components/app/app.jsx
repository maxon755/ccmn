import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NavBar from '../nav-bar';
import SideBar from '../side-bar';
import FirstFloorPage from '../../pages/first-floor-page';
import SecondFloorPage from '../../pages/second-floor-page';
import ThirdFloorPage from '../../pages/third-floor-page';
import { makeStyles } from '@material-ui/core/styles';
import AnalyticsPage from '../../pages/analytics-page';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

const App = () => {

    const classes = useStyles();

    return (
        <BrowserRouter>
            <div className={classes.root}>
                <NavBar/>
                <SideBar/>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path={'/first-floor'} component={FirstFloorPage}/>
                        <Route path={'/second-floor'} component={SecondFloorPage}/>
                        <Route path={'/third-floor'} component={ThirdFloorPage}/>
                        <Route path={'/analytics'} component={AnalyticsPage}/>
                    </Switch>
                </main>
            </div>

        </BrowserRouter>
    );
};

export default App;
