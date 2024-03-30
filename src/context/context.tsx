import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PROPERTIES } from "../api/api";
import { BookingType, BookingsNormalizedType, DefaultCtxValuesType, ToastType } from "../types/types";
import { calculateTotal, normalizeData } from "../utils/utils";

const properties = PROPERTIES;
const propertiesNormalized = normalizeData(PROPERTIES);

const df = {
    properties: properties,
    propertiesNormalized,
    bookings: [],
    bookingsNormalized: {},
    toastQueue: [],
    handleCreateBooking: () => { },
    handleEditBooking: () => { },
    handleDeleteBooking: () => { }
};

const BookingContext = createContext<DefaultCtxValuesType>(df);

const BookingProvider = ({ ...props }) => {

    const [bookings, setBookings] = useState<BookingType[]>(df.bookings);
    const [bookingsNormalized, setBookingsNormalized] = useState<BookingsNormalizedType>({});
    const [toastQueue, setToastQueue] = useState<ToastType[]>([]);

    useEffect(() => {
        setBookingsNormalized(normalizeData(bookings));
    }, [bookings]);

    const handleCreateBooking = (idProperty: string, start: string, end: string) => {
        const property = propertiesNormalized[idProperty];
        const { nights, total } = calculateTotal(start, end, property.price);
        const id = crypto.randomUUID().split('-')[0];

        setBookings((prev) => {
            return [...prev, {
                id,
                idProperty: idProperty,
                startDate: start,
                endDate: end,
                total,
                nights
            }];
        });

        handleShowToast(`Booking #${id} successfully created.`);
    };

    const handleEditBooking = useCallback((idProperty: string, start: string, end: string, idBooking: string) => {
        const newBookings = [...bookings];
        const bookingIdx = newBookings.findIndex(b => b.id === idBooking);
        const property = propertiesNormalized[idProperty];
        const { nights, total } = calculateTotal(start, end, property.price);

        newBookings[bookingIdx] = Object.assign({}, newBookings[bookingIdx], {
            nights,
            total,
            startDate: start,
            endDate: end
        });

        setBookings(newBookings);

        handleShowToast(`Booking #${idBooking} successfully updated.`);
    }, [bookings]);

    const handleDeleteBooking = (idBooking: string) => {
        setBookings((prev) => prev.filter(b => b.id !== idBooking));

        handleShowToast(`Booking #${idBooking} successfully removed.`);
    };

    const handleShowToast = (msg: string) => {
        const id = Math.random();
        const toast: ToastType = { id, msg };

        setToastQueue(prev => [...prev, toast]);

        setTimeout(() => {
            setToastQueue(prev => prev.filter(t => t.id !== id));
        }, 1500);
    };

    return <BookingContext.Provider value={{
        bookings,
        bookingsNormalized,
        properties,
        propertiesNormalized,
        toastQueue,
        handleCreateBooking,
        handleEditBooking,
        handleDeleteBooking
    }} {...props} />;
};

const useBookingContext = () => useContext(BookingContext);

export { BookingProvider, useBookingContext };
