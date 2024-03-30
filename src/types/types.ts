export type PropertyType = {
    id: string;
    name: string;
    description: string;
    img: string;
    location: string;
    rating: number;
    price: number;
};

export type PropertiesNormalizedType = {
    [id: string]: PropertyType;
};

export type BookingType = {
    id: string;
    idProperty: PropertyType['id'];
    startDate: string;
    endDate: string;
    total: number;
    nights: number;
};

export type BookingsNormalizedType = {
    [id: string]: BookingType;
};

export type NormalizedType<T> = {
    [key: string]: T;
};

export type ErrorsType = {
    start: string[];
    end: string[];
};

export type ToastType = {
    id: number,
    msg: string;
};

export type DeleteBookingInfoType = {
    booking: BookingType;
    property: PropertyType;
};

export type DefaultCtxValuesType = {
    propertiesNormalized: PropertiesNormalizedType;
    properties: PropertyType[];
    bookings: BookingType[];
    bookingsNormalized: BookingsNormalizedType;
    toastQueue: ToastType[],
    handleCreateBooking: (idProperty: string, s: string, e: string) => void;
    handleEditBooking: (idProperty: string, s: string, e: string, id: string) => void;
    handleDeleteBooking: (idBooking: string) => void;
};