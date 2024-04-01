import BookingCard from './BookingCard';
import { formatCurrency, formatDate } from '../../utils/utils';
import { BookingType } from '../../types/types';

describe('<BookingCard />', () => {
  let booking: BookingType;

  const mount = () => {
    const handleClickDeleteSpy = cy.spy().as('handleClickDeleteSpy');
    cy.mountAll(<BookingCard
      booking={booking}
      handleClickDelete={handleClickDeleteSpy}
    />);
  };

  before(() => {
    cy.fixture('booking').then((data) => {
      booking = data;
    });
  });

  beforeEach(() => mount());

  context('render tests', () => {
    it('renders', () => {
      cy.dataCy('booking-card-id')
        .should('have.text', booking.id);

      cy.dataCy('booking-card-start-date')
        .should('have.text', formatDate(booking.startDate));

      cy.dataCy('booking-card-end-date')
        .should('have.text', formatDate(booking.endDate));

      cy.dataCy('booking-card-nights')
        .should('contain', booking.nights);

      cy.dataCy('booking-card-total')
        .should('contain', formatCurrency(booking.total));

      cy.dataCy('booking-card-edit-btn')
        .should('have.text', 'Edit');

      cy.dataCy('booking-card-delete-btn')
        .should('have.text', 'Delete');
    });
  });

  context('behavior tests', () => {
    it('calls handleClickDeleteSpy', () => {
      cy.dataCy('booking-card-delete-btn').click();

      cy.get('@handleClickDeleteSpy')
        .should('be.calledOnce');
    });
  });
});