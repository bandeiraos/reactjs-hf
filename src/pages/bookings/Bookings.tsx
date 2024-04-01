import { useCallback, useState } from "react";
import { useBookingContext } from "../../context/context";
import { BookingType, DeleteBookingInfoType, PropertyType } from "../../types/types";
import { formatDate, groupBookings } from "../../utils/utils";
import Button from "../../components/common/button/Button";
import Modal from "../../components/common/modal/Modal";
import BookingCard from "../../components/booking-card/BookingCard";
import PageTitle from "../../components/common/page-title/PageTitle";
import EmptyState from "../../components/common/empty-state/EmptyState";

function Bookings() {
    const { bookings, propertiesNormalized, handleDeleteBooking } = useBookingContext();
    const [toggleModal, setToggleModal] = useState(true);
    const [deleteInfo, setDeleteInfo] = useState<DeleteBookingInfoType | null>(null);
    const bookingsGrouped = groupBookings(bookings);

    const handleOpenDeleteModal = useCallback((booking: BookingType, property: PropertyType) => {
        setDeleteInfo({ booking, property });

        setToggleModal(true);
    }, []);

    const handleConfirmDeletion = useCallback(() => {
        if (deleteInfo) {
            handleDeleteBooking(deleteInfo?.booking.id);
            setToggleModal(false);
            setDeleteInfo(null);
        }
    }, [deleteInfo, handleDeleteBooking]);

    return (
        <div>
            <PageTitle title="My Bookings" />

            {toggleModal && deleteInfo &&
                <Modal
                    Body={<DeleteModalBody {...deleteInfo} />}
                    onCancel={() => setToggleModal(false)}
                    ButtonConfirm={<Button dataCy="modal-delete-btn" title="Delete" onClick={handleConfirmDeletion} className="bg-red-600" />}
                />
            }

            <div>
                {!bookings.length ? <EmptyState />
                    :
                    Object.keys(bookingsGrouped).map(idP => {
                        const property = propertiesNormalized[idP];
                        const propertyBookings = bookingsGrouped[idP];

                        return (
                            <div data-cy="booking-property" key={idP} className="mb-6">
                                <div className="mb-4">
                                    <span className="font-bold text-xl text-slate-700">
                                        🏡 {property.name}
                                    </span>
                                </div>

                                <div className="md:grid md:grid-cols-3 gap-4">
                                    {propertyBookings.map((booking) => (
                                        <BookingCard
                                            key={booking.id}
                                            booking={booking}
                                            handleClickDelete={() => handleOpenDeleteModal(booking, property)} />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

function DeleteModalBody(deleteInfo: DeleteBookingInfoType) {
    return (
        <div data-cy="modal-body">
            <span className="font-bold">
                Are you sure you want to remove this booking?
            </span>
            <div className="mt-4">
                <ul>
                    <li><strong>ID: </strong><span className="text-xs">{deleteInfo?.booking.id}</span></li>
                    <li><strong>Property: </strong>{deleteInfo?.property.name}</li>
                    <li><strong>Dates: </strong>{formatDate(deleteInfo?.booking.startDate)} - {formatDate(deleteInfo?.booking.endDate)}</li>
                </ul>
            </div>
        </div>
    );
}


export default Bookings;