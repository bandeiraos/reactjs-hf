import EmptyState from "../../components/common/empty-state/EmptyState";
import PageTitle from "../../components/common/page-title/PageTitle";
import PropertyCard from "../../components/property-card/PropertyCard";
import { useBookingContext } from "../../context/context";

function PropertyList() {
    const { properties } = useBookingContext();
    return (
        <div>
            <PageTitle title="Properties" />

            {!properties.length ? <EmptyState /> :
                properties.map(p => (
                    <PropertyCard key={p.id} {...p} showButton />
                ))}
        </div>
    );
}

export default PropertyList;