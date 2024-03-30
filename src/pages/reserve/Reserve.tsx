// This component is used both for create and edit a booking

import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../components/form/Form';
import PropertyCard from '../../components/property-card/PropertyCard';
import { useBookingContext } from '../../context/context';
import PageTitle from '../../components/common/page-title/PageTitle';
import NotFound from '../not-found/NotFound';
import { BookingType, PropertyType } from '../../types/types';

function Reserve() {
    const {
        propertiesNormalized,
        bookings,
        bookingsNormalized,
        handleCreateBooking,
        handleEditBooking,
    } = useBookingContext();

    const { id, bookingId } = useParams(),
        booking: BookingType | null = bookingId ? bookingsNormalized[bookingId] : null,
        isEdit: boolean = !!booking,
        propertyId: string | undefined = isEdit ? booking?.idProperty : id,
        property: PropertyType | null = propertyId ? propertiesNormalized[propertyId] : null,
        propertyBookings: BookingType[] = isEdit ? bookings.filter(b => b.id !== bookingId) : bookings,
        navigate = useNavigate();

    const handleClickConfirm = useCallback((start: string, end: string) => {
        if (isEdit) {
            handleEditBooking(propertyId!, start, end, bookingId!);
        } else {
            handleCreateBooking(propertyId!, start, end);
        }

        navigate('/bookings');
    }, [propertyId, isEdit, bookingId, handleCreateBooking, handleEditBooking, navigate]);

    if (!property)
        return <NotFound />;

    return (
        <div>
            <PageTitle title='Availability' />

            <section>
                <Form
                    handleClickConfirm={handleClickConfirm}
                    bookings={propertyBookings}
                    price={property.price}
                    startDate={isEdit ? booking!.startDate : ""}
                    endDate={isEdit ? booking!.endDate : ""}
                    isEdit={isEdit}
                />
            </section>

            <section className='mt-8'>
                <div className='mb-4'>
                    <span className='font-bold'>About the property:</span>
                </div>

                <PropertyCard {...property} />
            </section>
        </div>
    );
}

export default Reserve;