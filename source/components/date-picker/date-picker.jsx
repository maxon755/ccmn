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

    let [buttonName, setButtonName] = useState('Choose Date');

    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' });

    const handleButtonName = ({startDate, endDate}) => {
        setButtonName(startDate.toDateString() + ' - ' + endDate.toDateString())
    };

    return (
        <div>
            <PopupState variant="popper" popupId="demo-popup-menu">
                {popupState => (
                    <React.Fragment>
                        <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
                            {buttonName}
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
                                    setDateRange({
                                        startDate: ranges.selection.startDate,
                                        endDate: ranges.selection.endDate,
                                        key: 'selection',
                                    });
                                    handleButtonName(ranges.selection);
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
