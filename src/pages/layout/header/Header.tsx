import { Link } from "react-router-dom";

function Header() {
    return (
        <header data-cy="header" className="flex justify-center h-[40px] p-8 bg-blue-500 text-white">
            <div className="flex w-full justify-between items-center lg:w-[800px]">
                <strong className="text-4xl">
                    <Link to={'/'}>Bkn</Link>
                </strong>
                <nav className="flex gap-4 underline">
                    <Link to={'/'}>Properties</Link>
                    <Link to={'/bookings'}>My bookings</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;