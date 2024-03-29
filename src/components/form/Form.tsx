import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BookingType, ErrorsType } from "../../types/types";
import { calculateTotal, formatCurrency, validateDates } from "../../utils/utils";
import DateInput from "../common/date-input/DateInput";
import Button from "../common/button/Button";

const todayMin = moment().format('yyyy-MM-DD');

const initialErrorsState = { start: [], end: [] };

type FormProps = {
    startDate: string;
    endDate: string;
    bookings: BookingType[],
    handleClickConfirm: (s: string, e: string) => void;
    price: number;
    isEdit: boolean;
};

function Form(props: FormProps) {
    const { startDate, endDate, bookings, price, isEdit, handleClickConfirm } = props;
    const [start, setStart] = useState(startDate);
    const [end, setEnd] = useState(endDate);
    const [errors, setErrors] = useState<ErrorsType>(initialErrorsState);
    const [info, setInfo] = useState({ nights: 0, total: 0 });

    const shouldShowInfo = start && end && !errors.start.length && !errors.end.length;

    useEffect(() => {
        const newErrors = validateDates(start, end, bookings);

        if (!newErrors.start.length && !newErrors.end.length) {
            setInfo(calculateTotal(start, end, price));
        }

        setErrors(newErrors);

    }, [start, end, bookings, price, shouldShowInfo]);

    const handleReserve = useCallback(() => {
        if (!start || !end) return;

        handleClickConfirm(start, end);
    }, [start, end, handleClickConfirm]);

    const errorsMemo = useMemo(() => {
        if (!errors.start.length && !errors.end.length)
            return null;


        return Object.keys(errors).map((type) =>
            <ul key={type} className="flex flex-col mt-2">
                {errors[type as keyof typeof errors].map((s: string) => (
                    <li key={s} className="text-red-500 mt-1 list-inside list-disc">{s}</li>
                ))}
            </ul>
        );

    }, [errors]);

    return (
        <div>
            <div className="flex flex-col gap-2">
                <DateInput title="Start date:" onChange={(e) => setStart(e.target.value)} value={start} min={todayMin} />
                <DateInput title="End date:" onChange={(e) => setEnd(e.target.value)} value={end} min={todayMin} />
            </div>

            <div className="mt-2">
                {errorsMemo}
            </div>

            {shouldShowInfo && info && (
                <div className="mt-4 flex justify-around md:justify-end md:gap-8">
                    <div>
                        <strong>🌃 Nights: </strong>
                        <span className="text-xl">{`${info.nights}`}</span>
                    </div>
                    <div>
                        <strong>💲 Total: </strong>
                        <span className="text-xl">{formatCurrency(info.total)}</span>
                    </div>
                </div>
            )}

            <div className="flex justify-end mt-4">
                <Button
                    title={isEdit ? 'Apply changes' : 'Reserve'}
                    onClick={handleReserve}
                    disabled={!!errors.end.length || !!errors.start.length || !start || !end}
                />
            </div>
        </div>

    );
}

export default Form;