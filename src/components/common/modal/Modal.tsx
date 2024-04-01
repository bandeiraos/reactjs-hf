import React, { useEffect, useRef } from "react";
import Button from "../button/Button";

type ModalProps = {
    Body: React.ReactNode;
    ButtonConfirm: React.ReactNode;
    onCancel: () => void;
};

function Modal(props: ModalProps) {
    const cancelBtnRef: React.RefObject<HTMLButtonElement> = useRef(null);

    useEffect(() => {
        if (cancelBtnRef)
            cancelBtnRef?.current?.focus();

        // lock scroll
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [cancelBtnRef]);

    return (
        <dialog data-cy="modal" open className="fixed top-0 z-10 p-6 w-full h-full bg-black/60">
            <div className="rounded bg-slate-50 p-8 mt-20 md:max-w-[400px] md:m-auto md:mt-20">
                <div> {props.Body} </div>

                <div className="mt-4 flex justify-between">
                    <Button dataCy="modal-cancel-btn" btnRef={cancelBtnRef} title="Cancel" onClick={props.onCancel} className="bg-slate-500" />
                    {props.ButtonConfirm}
                </div>
            </div>
        </dialog>

    );
}

export default Modal;