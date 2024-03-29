import React from 'react';
import Header from '../header/Header';
import { Outlet } from 'react-router-dom';

import useRestoreScroll from '../../hooks/useRestoreScroll';

const PageWrapper: React.FC = () => {
    return (
        <div className='p-4 flex-col lg:mx-auto lg:w-[800px]'>
            <Outlet />
        </div>
    );
};

function Layout() {

    useRestoreScroll();

    return (
        <div className=''>
            <Header />
            <PageWrapper />
        </div>
    );
}

export default Layout;