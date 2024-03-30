export type ButtonProps = {
    title: string;
    onClick: () => void;
    className?: string;
    disabled?: boolean;
    btnRef?: React.RefObject<HTMLButtonElement>;
    dataCy?: string;
};

function Button(props: ButtonProps) {
    return (
        <button
            data-cy={props.dataCy || "button-cmp"}
            className={`bg-blue-500 hover:opacity-90 text-white font-bold py-2 px-4 rounded cursor-pointer disabled:cursor-default disabled:bg-slate-200 ${props.className}`}
            onClick={props.onClick}
            disabled={props.disabled}
            ref={props.btnRef}
        >
            {props.title}
        </button>
    );
}

export default Button;