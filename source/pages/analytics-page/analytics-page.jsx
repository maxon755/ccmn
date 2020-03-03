import React, { useState, useEffect } from 'react';
import DatePicker from '../../components/date-picker';
import TotalVisitors from "../../components/total-visitors";
import DateHelper from "../../helpers/DateHelper";

const AnalyticsPage = () => {

    const [date, setDate] = useState({
        startDate: DateHelper.toIsoDateString(new Date()),
        endDate: DateHelper.toIsoDateString(new Date())
    });

    const onDateChangeHandler = (date) => {
        setDate({
            startDate: DateHelper.toIsoDateString(date.startDate),
            endDate: DateHelper.toIsoDateString(date.endDate)
        });
        console.log(date);
    };

    return (
        <div>
            <DatePicker onDateChangeHandler={onDateChangeHandler} />
            { date ? <TotalVisitors date={date}/> : null }
        </div>

    )
};

export default AnalyticsPage;
