import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="flex justify-center h-[40px] p-8 bg-blue-500 text-white">
            <div className="flex w-full justify-between items-center lg:w-[800px]">
                <strong>Bkn</strong>
                <nav className="flex gap-4 underline">
                    <Link to={'/'}>Places</Link>
                    <Link to={'/bookings'}>Bookings</Link>
                </nav>
            </div>
        </div>
    );
}

export default Header;