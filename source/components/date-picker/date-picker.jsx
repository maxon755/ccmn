import React, { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import PopupState from 'material-ui-popup-state';
import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks'

const DatePicker = () => {

    let [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

    return (
        <div>
            <PopupState variant="popper" popupId="demo-popup-menu">
                {popupState => (
                    <React.Fragment>
                        <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                            Open Menu
                        </Button>
                        <Menu {...bindMenu(popupState)}
                              getContentAnchorEl={null}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                        }}>
                            <DateRangePicker
                                ranges={[dateRange]}
                                onChange={(ranges) => {
                                    console.log(ranges);
                                }}
                            />
                        </Menu>
                    </React.Fragment>
                )}
            </PopupState>
        </div>

    )
};

export default DatePicker;
