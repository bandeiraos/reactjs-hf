import {
    createBrowserRouter
} from "react-router-dom";
import Bookings from "../pages/bookings/Bookings";
import PropertyList from "../pages/property-list/PropertyList";
import Layout from "../layout/layout/Layout";
import Reserve from "../pages/reserve/Reserve";
import NotFound from "../pages/not-found/NotFound";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                path: "/",
                element: <PropertyList />,
            },
            {
                path: "/bookings",
                element: <Bookings />,
            },
            {
                path: "/reserve/:id",
                element: <Reserve />,
            },
            {
                path: "/booking/:bookingId",
                element: <Reserve />,
            },
            {
                path: "*",
                element: <NotFound />
            }
        ],
    },
]);

export default router;