import { useBookingContext } from '../../../context/context';

function Toaster() {
    const { toastQueue } = useBookingContext();

    return (
        <div data-cy="toaster" className='top-20 fixed w-full flex flex-col items-center z-10'>
            {toastQueue.map((toast) => (
                <div
                    data-cy="toast"
                    key={toast.id}
                    className={'bg-green-600 py-2 px-9 mt-2 text-center rounded-lg text-white'}
                >
                    {toast.msg}
                </div>
            ))}
        </div>
    );
}

export default Toaster;