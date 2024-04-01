import { ERRORS } from '../../constants/constants';
import { BookingType } from '../../types/types';
import { formatDate } from '../../utils/utils';
import Form, { FormProps } from './Form';

describe('<Form />', () => {

  let bookings: BookingType[];

  const mount = (props: Omit<FormProps, 'handleClickConfirm'>) => {
    const handleClickConfirmSpy = cy.spy().as('handleClickConfirmSpy');

    cy.mountAll(
      <Form
        {...props}
        handleClickConfirm={handleClickConfirmSpy}
      />
    );
  };

  const mountCreate = () => {
    mount({
      startDate: "",
      endDate: "",
      bookings: bookings,
      price: 100,
      isEdit: false
    });
  };

  before(() => {
    cy.fixture('bookings').then((data) => bookings = data);
  });

  context('render tests', () => {
    it('renders creation form', () => {
      mountCreate();

      cy.dataCy('date-field').should('have.length', 2);

      cy.dataCy('date-field-input').eq(0).should('have.value', '');

      cy.dataCy('date-field-input').eq(1).should('have.value', '');

      cy.dataCy('form-errors').should('not.exist');

      cy.dataCy('form-info').should('not.exist');

      cy.dataCy('form-reserve-btn')
        .should('have.attr', 'disabled', 'disabled')
        .and('have.text', 'Reserve');
    });

    it('renders edit form', () => {
      mount({
        startDate: "2024-11-04",
        endDate: "2024-11-08",
        bookings: bookings,
        price: 100,
        isEdit: true
      });

      cy.dataCy('date-field-input').eq(0).should('have.value', '2024-11-04');

      cy.dataCy('date-field-input').eq(1).should('have.value', '2024-11-08');

      cy.dataCy('form-errors').should('not.exist');

      cy.dataCy('form-info').should('exist');

      cy.dataCy('form-info-nights').should('contain', 'Nights: 4');

      cy.dataCy('form-info-total').should('contain', 'Total: $400.00');

      cy.dataCy('form-reserve-btn')
        .should('not.have.attr', 'disabled', 'disabled')
        .and('have.text', 'Apply changes');
    });
  });

  context('behavior tests', () => {

    beforeEach(() => mountCreate());

    it('enables confirm button, renders info, and calls onClickConfirm on click', () => {
      cy.dataCy('date-field-input').eq(0).type('2024-11-01');
      cy.dataCy('date-field-input').eq(1).type('2024-11-03');

      cy.dataCy('form-info-nights').should('contain', '2');
      cy.dataCy('form-info-total').should('contain', '$200.00');

      cy.dataCy('form-reserve-btn').click();

      cy.get('@handleClickConfirmSpy').should('have.been.calledOnce');
    });

    context('validation/error msg tests', () => {
      afterEach(() => {
        cy.dataCy('form-reserve-btn')
          .should('have.attr', 'disabled', 'disabled');
      });

      it('shows past date errors for start and end dates', () => {
        cy.dataCy('date-field-input').eq(0).type('2022-05-05');
        cy.dataCy('date-field-input').eq(1).type('2022-06-05');

        cy.dataCy('form-errors')
          .should('contain', ERRORS.START_PAST)
          .and('contain', ERRORS.END_PAST);
      });

      it('shows start after end date error', () => {
        cy.dataCy('date-field-input').eq(0).type('2024-05-05');
        cy.dataCy('date-field-input').eq(1).type('2024-05-04');

        cy.dataCy('form-errors')
          .should('contain', ERRORS.START_AFTER_END);
      });

      it('shows start year limit error', () => {
        cy.dataCy('date-field-input').eq(0).type('2026-05-05');

        cy.dataCy('form-errors')
          .should('contain', ERRORS.START_YEAR_LIMIT);
      });

      it('shows date conflict error (already exists a booking at selected date)', () => {
        const replacedMsg = ERRORS.BOOKING_CONFLICT
          .replace('%t', 'start')
          .replace('%id', bookings[0].id)
          .replace('%sd', formatDate(bookings[0].startDate))
          .replace('%ed', formatDate(bookings[0].endDate));

        cy.dataCy('date-field-input').eq(0).type('2024-12-04');
        cy.dataCy('date-field-input').eq(1).type('2024-12-10');

        cy.dataCy('form-errors')
          .should('have.text', replacedMsg);
      });

      it('shows same start and end date error', () => {
        cy.dataCy('date-field-input').eq(0).type('2024-05-05');
        cy.dataCy('date-field-input').eq(1).type('2024-05-05');

        cy.dataCy('form-errors')
          .should('contain', ERRORS.SAME_DATE);
      });

      it('shows max booking days limit error', () => {
        cy.dataCy('date-field-input').eq(0).type('2024-05-05');
        cy.dataCy('date-field-input').eq(1).type('2025-05-06');

        cy.dataCy('form-errors')
          .should('contain', ERRORS.MAX_DAYS_STAY);
      });
    });

  });
});