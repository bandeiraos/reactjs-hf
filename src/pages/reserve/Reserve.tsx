import { useNavigate, useParams } from 'react-router-dom';
import Form from '../../components/form/Form';
import PropertyCard from '../../components/property-card/PropertyCard';
import { useBookingContext } from '../../context/context';
import { useCallback } from 'react';
import { getBookingsByProperty } from '../../utils/utils';
import PageTitle from '../../components/common/page-title/PageTitle';

function Reserve() {
    const {
        propertiesNormalized,
        bookings,
        bookingsNormalized,
        handleCreateBooking,
        handleEditBooking,
    } = useBookingContext(),
        { id, bookingId } = useParams(),
        booking = bookingId ? bookingsNormalized[bookingId] : null,
        isEdit = !!booking,
        propertyId = id ?? booking?.idProperty,
        property = propertyId ? propertiesNormalized[propertyId] : null,
        propertyBookings = propertyId && getBookingsByProperty(propertyId, bookings, bookingId),
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
        return 'Not found';

    return (
        <div>
            <PageTitle title='Availability' />

            <section>
                <Form
                    handleClickConfirm={handleClickConfirm}
                    bookings={propertyBookings || []}
                    price={property.price}
                    startDate={isEdit ? booking.startDate : ""}
                    endDate={isEdit ? booking.endDate : ""}
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