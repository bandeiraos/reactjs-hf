import { formatCurrency, formatDate } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { BookingType, PropertyType } from '../../types/types';
import Button from '../common/button/Button';

type BookingCardProps = {
    property: PropertyType;
    booking: BookingType;
    handleClickDelete: (b: BookingType, p: PropertyType) => void;
};

function BookingCard(props: BookingCardProps) {
    const { property, booking, handleClickDelete } = props;

    const navigate = useNavigate();

    return (
        <div className="shadow-md rounded mb-4 p-8 flex flex-col bg-white">
            <div>
                <div>

                    <div>
                        <span className="font-bold text-xl">{property.name}</span>
                    </div>
                    <div className="text-sm">
                        <span>{formatDate(booking.startDate)}</span> - <span>{formatDate(booking.endDate)}</span>
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <span> {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</span>
                    <span className="text-xl">{formatCurrency(booking.total)}</span>
                </div>
            </div>

            <div className="flex gap-2 self-end">
                <Button title="Edit" onClick={() => navigate(`/booking/${booking.id}`)} />
                <Button title="Delete" onClick={() => handleClickDelete(booking, property)} className="bg-red-600" />
            </div>
        </div>
    );
}

export default BookingCard;