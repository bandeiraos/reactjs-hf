import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { PROPERTIES } from "../api/api";
import { BookingType, BookingsNormalizedType, DefaultCtxValuesType } from "../types/types";
import { calculateTotal, normalizeData } from "../utils/utils";

const properties = PROPERTIES;
const propertiesNormalized = normalizeData(PROPERTIES);

const df = {
    properties: properties,
    propertiesNormalized,
    bookings: [
        // {
        //     "id": "aa98107c-9d35-4e73-ae00-26caa55ad6be",
        //     "idProperty": "3",
        //     "startDate": "2024-03-28",
        //     "endDate": "2024-03-29",
        //     "total": 320,
        //     "nights": 1
        // },
        // {
        //     "id": "2d365625-1dfd-4ea2-bd72-6301e723e3e7",
        //     "idProperty": "1",
        //     "startDate": "2024-03-29",
        //     "endDate": "2024-04-04",
        //     "total": 3000,
        //     "nights": 6
        // },
        // {
        //     "id": "063298ae-96a3-43d2-8c36-0fe14c4bb708",
        //     "idProperty": "2",
        //     "startDate": "2024-03-29",
        //     "endDate": "2024-04-04",
        //     "total": 1500,
        //     "nights": 6
        // }
    ],
    bookingsNormalized: {},
    handleCreateBooking: () => { },
    handleEditBooking: () => { },
    handleDeleteBooking: () => { }
};

export const BookingContext = createContext<DefaultCtxValuesType>(df);

const BookingProvider = ({ ...props }) => {

    const [bookings, setBookings] = useState<BookingType[]>(df.bookings);
    const [bookingsNormalized, setBookingsNormalized] = useState<BookingsNormalizedType>({});

    useEffect(() => {
        setBookingsNormalized(normalizeData(bookings));
    }, [bookings]);

    const handleCreateBooking = (idProperty: string, start: string, end: string) => {
        const property = propertiesNormalized[idProperty];
        const { nights, total } = calculateTotal(start, end, property.price);

        setBookings((prev) => {
            return [...prev, {
                id: crypto.randomUUID(),
                idProperty: idProperty,
                startDate: start,
                endDate: end,
                total,
                nights
            }];
        });
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

    }, [bookings]);

    const handleDeleteBooking = (bookingId: string) => {
        setBookings((prev) => prev.filter(b => b.id !== bookingId));
    };

    return <BookingContext.Provider value={{
        bookings,
        bookingsNormalized,
        properties,
        propertiesNormalized,
        handleCreateBooking,
        handleEditBooking,
        handleDeleteBooking
    }} {...props} />;
};

const useBookingContext = () => useContext(BookingContext);

export { BookingProvider, useBookingContext };