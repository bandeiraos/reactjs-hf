export type DateInputProps = {
    title: string;
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: string;
};

function DateInput(props: DateInputProps) {
    const { title, value, onChange, min } = props;

    return (
        <label data-cy="date-field" className="flex flex-col">
            <span className="font-bold">{title}</span>
            <input
                className="p-3 border rounded"
                type="date"
                onChange={onChange}
                defaultValue={value} min={min} />
        </label>
    );
}

export default DateInput;