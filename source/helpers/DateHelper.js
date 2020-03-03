
export default class DateHelper {

    /**
     * Converts date object to string in 'year-month-day' format
     *
     * @param date Date
     */
    static toIsoDateString(date) {
        return date.toISOString().slice(0, 10);
    }
}
