import { Outlet } from 'react-router-dom';

function PageWrapper() {
    return (
        <div data-cy="page-wrapper" className='p-4 flex-col lg:mx-auto lg:w-[800px]'>
            <Outlet />
        </div>
    );
}

export default PageWrapper;