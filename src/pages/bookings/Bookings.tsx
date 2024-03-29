import { useCallback, useMemo, useState } from "react";
import { useBookingContext } from "../../context/context";
import { BookingType, PropertyType } from "../../types/types";
import Button from "../../components/common/button/Button";
import Modal from "../../components/common/modal/Modal";
import BookingCard from "../../components/booking-card/BookingCard";
import PageTitle from "../../components/common/page-title/PageTitle";
import EmptyState from "../../components/common/empty-state/EmptyState";

type DeleteInfoType = {
    booking: BookingType;
    property: PropertyType;
};

function Bookings() {
    const { bookings, propertiesNormalized, handleDeleteBooking } = useBookingContext();
    const [toggleModal, setToggleModal] = useState(true);
    const [deleteInfo, setDeleteInfo] = useState<DeleteInfoType | null>(null);

    const handleOpenDeleteModal = useCallback((booking: BookingType, property: PropertyType) => {
        setDeleteInfo({
            booking,
            property
        });
        setToggleModal(true);
    }, []);

    const handleConfirmDeletion = useCallback(() => {
        if (deleteInfo) {
            handleDeleteBooking(deleteInfo?.booking.id);
            setToggleModal(false);
            setDeleteInfo(null);
        }
    }, [deleteInfo, handleDeleteBooking]);

    const bodyMemo = useMemo(() => {
        return (
            <div>
                <span className="font-bold">Are you sure you want to remove this booking?</span>
                <div className="mt-4">
                    <ul>
                        <li><strong>ID: </strong><span className="text-xs">{deleteInfo?.booking.id}</span></li>
                        <li><strong>Location: </strong>{deleteInfo?.property.name}</li>
                        <li><strong>Dates: </strong>{deleteInfo?.booking.startDate} - {deleteInfo?.booking.endDate}</li>
                    </ul>
                </div>
            </div>
        );
    }, [deleteInfo]);

    return (
        <div>
            <PageTitle title="Bookings" />

            {toggleModal && deleteInfo &&
                (<Modal
                    Body={bodyMemo}
                    onCancel={() => setToggleModal(false)}
                    ButtonConfirm={
                        <Button title="Delete" onClick={handleConfirmDeletion} className="bg-red-600" />
                    }
                />)
            }

            <div>
                {!bookings.length ? <EmptyState /> :

                    bookings.map(b =>
                        <BookingCard key={b.id} booking={b} property={propertiesNormalized[b.idProperty]} handleClickDelete={handleOpenDeleteModal} />
                    )}
            </div>

        </div>
    );
}

export default Bookings;