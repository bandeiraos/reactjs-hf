import Header from '../header/Header';
import { Outlet } from 'react-router-dom';

import useRestoreScroll from '../../hooks/useRestoreScroll';
import { useBookingContext } from '../../context/context';

const PageWrapper = () => {
    return (
        <div className='p-4 flex-col lg:mx-auto lg:w-[800px]'>
            <Outlet />
        </div>
    );
};

const Toaster = () => {
    const { toastQueue } = useBookingContext();

    return (
        <div className='top-20 fixed w-full flex flex-col items-center z-10'>
            {toastQueue.map((toast) => (
                <div
                    key={toast.id}
                    className={'bg-green-600 py-2 px-9 mt-2 text-center rounded-lg text-white'}
                >
                    {toast.msg}
                </div>
            ))}
        </div>
    );
};

function Layout() {

    useRestoreScroll();

    return (
        <div>
            <Header />
            <Toaster />
            <PageWrapper />
        </div>
    );
}

export default Layout;