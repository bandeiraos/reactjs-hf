import { BookingType, PropertiesNormalizedType } from '../../types/types';
import { formatDate } from '../../utils/utils';
import Bookings from './Bookings';

describe('<Bookings />', () => {
  let bookings: BookingType[] = [],
    propertiesNormalized: PropertiesNormalizedType;

  before(() => {
    cy.fixture('bookings').then(data => {
      bookings = data;
    });

    cy.fixture('propertiesNormalized').then(data => {
      propertiesNormalized = data;
    });

  });

  const mount = (withData?: boolean) => {

    cy.mountAll(<Bookings />, {
      values: {
        propertiesNormalized,
        bookings: withData ? bookings : [],
        handleDeleteBooking: cy.spy().as('handleDeleteBookingSpy')
      }
    });
  };

  context('render tests', () => {
    it('renders with title', () => {
      mount();

      cy.dataCy('page-title')
        .should('have.text', 'My Bookings');
    });

    it('renders with empty data', () => {
      mount();

      cy.dataCy('empty-state')
        .should('exist');
    });

    it('renders with data', () => {
      mount(true);

      cy.dataCy('booking-property')
        .should('have.length', 2);

      cy.dataCy('booking-card')
        .should('have.length', 4);

      cy.dataCy('modal')
        .should('not.exist');
    });
  });

  context('behavior tests', () => {
    beforeEach(() => {
      mount(true);
      cy.dataCy('booking-card-delete-btn').eq(0).click();

    });

    it('opens deletion modal and show info', () => {
      cy.dataCy('modal')
        .should('exist');

      cy.dataCy('modal-body').then($modalBody => {
        cy.wrap($modalBody)
          .children('span')
          .should('have.text', 'Are you sure you want to remove this booking?');

        cy.wrap($modalBody).find('li').then($lis => {
          const booking = bookings[0];

          cy.wrap($lis).should('have.length', 3);

          cy.wrap($lis).eq(0).should('have.text', `ID: ${booking.id}`);
          cy.wrap($lis).eq(1).should('have.text', `Property: ${propertiesNormalized[booking.idProperty].name}`);
          cy.wrap($lis).eq(2).should('have.text', `Dates: ${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`);
        });
      });
    });

    it('opens deletion modal and closes with cancel button', () => {
      cy.dataCy('modal-cancel-btn').click();

      cy.dataCy('modal')
        .should('not.exist');

      cy.get('@handleDeleteBookingSpy')
        .should('not.be.called');
    });

    it('opens deletion modal and call handleDeleteBooking', () => {
      cy.dataCy('modal-delete-btn').click();

      cy.get('@handleDeleteBookingSpy')
        .should('be.calledOnce');
    });
  });

});