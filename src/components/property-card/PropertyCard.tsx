import { Link } from 'react-router-dom';
import { PropertyType } from '../../types/types';
import { formatCurrency } from '../../utils/utils';

export type PropertyCardProps = {
    showButton?: boolean;
} & PropertyType;

function PropertyCard(props: PropertyCardProps) {
    return (
        <div data-cy="property-card" className="shadow-md rounded mb-6 p-8 md:p-0 flex flex-col bg-white md:flex-row md:max-h-[350px]">
            <div className='flex justify-center mb-8 md:mb-0'>
                <img className='rounded max-w-[240px] md:max-w-[200px] md:w-auto'
                    src={props.img}
                    alt={props.name}
                    data-cy="property-card-img"
                />
            </div>

            <div className='flex md:ml-4 md:max-w-xl md:w-[600px] md:p-4'>
                <div className='flex flex-col'>
                    <h2 data-cy="property-card-title" className='font-bold text-xl text-slate-700'>{props.name}</h2>
                    <span data-cy="property-card-location" className='text-slate-500 text-sm mt-1'>📍 {props.location}</span>
                    <p data-cy="property-card-description" className='text-sm mt-2'>{props.description}</p>
                </div>
            </div>

            <div className='md:flex md:flex-col md:items-end md:justify-between md:ml-8 md:w-[250px] md:pr-8 md:py-4'>
                <div className='flex justify-between mt-4 md:flex-col md:gap-2 md:items-start'>
                    <div className='flex items-center'>
                        <span data-cy="property-card-rating">⭐ {props.rating}</span>
                        <span className='text-slate-400 text-xs'>/10</span>
                    </div>
                    <div className='flex items-center justify-center'>
                        <span data-cy="property-card-price">💲 {formatCurrency(props.price)}</span>
                        <span className='text-slate-400 text-xs'>/night</span>
                    </div>
                </div>

                {props.showButton &&
                    <div className='underline mt-4'>
                        <Link data-cy="property-card-availability-btn" to={`/reserve/${props.id}`}>See availability</Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default PropertyCard;