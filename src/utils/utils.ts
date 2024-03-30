import moment from "moment";
import { BookingType, ErrorsType, NormalizedType } from "../types/types";

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
            errors.start.push("Starting date cannot be in the past.");
        }

        if (end && isStartAfterEnd(start, end)) {
            errors.start.push("Start date must be before end date.");
        }

        if (isDateTooFar(start)) {
            errors.start.push("Start date should be less than 1 year");
        }
    }

    // end date validation
    if (end) {
        if (isDateBeforeToday(end)) {
            errors.end.push("Ending date cannot be in the past.");
        }
    }

    // start and end validation 
    if (start && end) {
        const hasConflict = checkDateConflict(start, end, bookings);

        // booking conflict validation
        if (hasConflict) {
            const { booking, target } = hasConflict;
            const shortUid = booking.id.split('-')[0];

            errors[target as keyof typeof errors]
                .push(`Your ${target} date has conflict with booking #${shortUid} (${formatDate(booking.startDate)} to ${formatDate(booking.endDate)}).`);
        }

        // same date validation
        if (start === end) {
            errors.start.push('Please select different dates for the start and end of the booking.');
        }

        // i'm putting a max of 1 year to stay in the property
        if (isDateRangeTooBig(start, end)) {
            errors.start.push('Please select dates within a maximum range of 365 days');
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