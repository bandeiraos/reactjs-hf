import { formatCurrency, formatDate } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { BookingType } from '../../types/types';
import Button from '../common/button/Button';

type BookingCardProps = {
    booking: BookingType;
    handleClickDelete: () => void;
};

function BookingCard(props: BookingCardProps) {
    const { booking, handleClickDelete } = props;
    const navigate = useNavigate();

    return (
        <div className="flex bg-white rounded shadow-md mb-4 p-4 justify-between md:flex-col md:mb-0">
            <div>
                <div>
                    <div className='flex flex-col'>
                        <div>
                            <span className='text-xs text-slate-400'>{booking.id}</span>
                        </div>
                        <div className="text-sm">
                            <span>{formatDate(booking.startDate)} - </span>
                            <span> {formatDate(booking.endDate)}</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col mt-2">
                    <span>🌃 {booking.nights} {booking.nights === 1 ? 'night' : 'nights'}</span>
                    <span className="text-xl">💲 {formatCurrency(booking.total)}</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 md:mt-4 md:flex-row justify-between">
                <Button title="Edit" onClick={() => navigate(`/booking/${booking.id}`)} />
                <Button title="Delete" onClick={handleClickDelete} className="bg-red-600" />
            </div>
        </div>
    );
}

export default BookingCard;