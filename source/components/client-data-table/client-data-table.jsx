import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    container: {
        marginTop: 25,
        width: 500,
    },

    table: {
        width: 200,
    },
});

const ClientDataTable = ({clientData}) => {
    const classes = useStyles();

    const data = {
        status: clientData.dot11Status,
        macAddress: clientData.macAddress,
        ...(clientData.ipAddress && {ipv4: clientData.ipAddress[0]}),
        ...(clientData.ipAddress && {ipv6: clientData.ipAddress[1]}),
        'x-coordinate': Math.round(clientData.mapCoordinate.x) + ' feet',
        'y-coordinate': Math.round(clientData.mapCoordinate.y) + ' feet',
    };

    const renderRow = (name, value) => {
        return (
            <TableRow key={name}>
                <TableCell component="th" scope="row">
                    {name}
                </TableCell>
                <TableCell align="right">{value} </TableCell>
            </TableRow>
        );
    };

    return (
        <TableContainer className={classes.container} component={Paper}>
            <Table aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Property</TableCell>
                        <TableCell align='right'>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.entries(data).map(([name, value]) => {
                            return renderRow(name, value)
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ClientDataTable;
