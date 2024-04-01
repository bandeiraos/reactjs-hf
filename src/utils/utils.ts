import moment from "moment";
import { BookingType, ErrorsType, NormalizedType } from "../types/types";
import { ERRORS } from "../api/constants/constants";

export const normalizeData = <T extends { id: string; }>(array: T[]): NormalizedType<T> => {
    return array.reduce((obj: NormalizedType<T>, item: T) => {
        obj[item.id] = item;
        return obj;
    }, {});
};


const checkDateConflict = (start: string, end: string, bookings: BookingType[]) => {
    for (let i = 0; i < bookings.length; i++) {
        const { startDate, endDate } = bookings[i];
        if (moment(start).isBetween(startDate, endDate, null, '[]')) {
            return { booking: bookings[i], target: "start" };
        } else if (moment(end).isBetween(startDate, endDate, null, '[]')) {
            return { booking: bookings[i], target: "end" };
        }
    }
    return false;
};

export const calculateTotal = (start: string, end: string, price: number): { nights: number, total: number; } => {
    const startDate = moment(start);
    const endDate = moment(end);

    const nights = endDate.diff(startDate, 'days');

    return { nights, total: nights * price };
};

export const formatDate = (date: string) => moment(date).format('MM/DD/yyyy');

export const formatCurrency = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

const isDateBeforeToday = (date: string) => {
    return moment(date).startOf('day') < moment().startOf('day');
};

const isStartAfterEnd = (start: string, end: string) => {
    return moment(start).startOf('day') > moment(end).startOf('day');
};

const isDateTooFar = (s: string) => {
    const diffYears = moment(s).diff(moment(), 'days');

    return diffYears >= 365;
};

const isDateRangeTooBig = (s: string, e: string) => {
    const diffDates = moment(e).diff(moment(s), 'days');

    return diffDates > 365;
};

export const validateDates = (start: string, end: string, bookings: BookingType[]) => {
    const errors: ErrorsType = { start: [], end: [] };

    // start date validation
    if (start) {
        if (isDateBeforeToday(start)) {
            errors.start.push(ERRORS.START_PAST);
        }

        if (end && isStartAfterEnd(start, end)) {
            errors.start.push(ERRORS.START_AFTER_END);
        }

        if (isDateTooFar(start)) {
            errors.start.push(ERRORS.START_YEAR_LIMIT);
        }
    }

    // end date validation
    if (end) {
        if (isDateBeforeToday(end)) {
            errors.end.push(ERRORS.END_PAST);
        }
    }

    // start and end validation 
    if (start && end) {
        const hasConflict = checkDateConflict(start, end, bookings);

        // booking conflict validation
        if (hasConflict) {
            const { booking, target } = hasConflict;
            const shortUid = booking.id.split('-')[0];
            const strMap: { [a: string]: string; } = {
                "%t": target,
                "%id": shortUid,
                "%sd": formatDate(booking.startDate),
                "%ed": formatDate(booking.endDate)
            };
            const errMsg = Object.keys(strMap).reduce(
                (acc, item) => acc.replace(item, strMap[item]),
                ERRORS.BOOKING_CONFLICT
            );

            errors[target as keyof typeof errors].push(errMsg);
        }

        // same date validation
        if (start === end) {
            errors.start.push(ERRORS.SAME_DATE);
        }

        // i'm putting a max of 1 year to stay in the property
        if (isDateRangeTooBig(start, end)) {
            errors.start.push(ERRORS.MAX_DAYS_STAY);
        }
    }

    return errors;
};

export const groupBookings = (bookings: BookingType[]) => {
    const groupedItems: { [key: string]: BookingType[]; } = {};

    bookings.forEach(b => {
        const idProperty = b.idProperty;

        if (!groupedItems[idProperty]) {
            groupedItems[idProperty] = [];
        }

        groupedItems[idProperty].push(b);
    });

    return groupedItems;
};