import Header from '../header/Header';
import useRestoreScroll from '../../../hooks/useRestoreScroll';
import PageWrapper from '../page-wrapper/PageWrapper';
import Toaster from '../toaster/Toaster';

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