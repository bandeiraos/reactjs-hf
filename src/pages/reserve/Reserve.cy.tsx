import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { normalizeData } from '../../utils/utils';
import Reserve from './Reserve';
import { BookingProvider } from '../../context/context';
import { BookingType, BookingsNormalizedType, PropertiesNormalizedType } from '../../types/types';

describe('<Reserve />', () => {
  const CREATION_PROPERTY = "3";
  const EDITION_BOOKING_IDX = 0;

  let propertiesNormalized: PropertiesNormalizedType,
    bookings: BookingType[],
    bookingsNormalized: BookingsNormalizedType;

  const mount = (isEdit?: boolean) => {
    const browserRoute = isEdit ? `/booking/${bookings[EDITION_BOOKING_IDX].id}` : `/reserve/${CREATION_PROPERTY}`;
    const compPath = isEdit ? '/booking/:bookingId' : '/reserve/:id';

    const spies = {
      handleCreateBooking: cy.spy().as('handleCreateBookingSpy'),
      handleEditBooking: cy.spy().as('handleEditBookingSpy'),
    };

    cy.mount(
      <BookingProvider values={{
        propertiesNormalized,
        bookings,
        bookingsNormalized,
        handleCreateBooking: spies.handleCreateBooking,
        handleEditBooking: spies.handleEditBooking
      }}>
        <MemoryRouter initialEntries={[browserRoute]}>
          <Routes>
            <Route path={compPath} element={<Reserve />} />
          </Routes>
        </MemoryRouter>
      </BookingProvider >
    );
  };

  before(() => {
    cy.fixture('bookings').then(data => {
      bookings = data;
      bookingsNormalized = normalizeData(data);
    });

    cy.fixture('properties').then(data => {
      propertiesNormalized = normalizeData(data);
    });
  });

  context('render tests', () => {
    it('renders', () => {
      mount();

      cy.dataCy('reserve').should('exist');
      cy.dataCy('page-title').should('have.text', 'Availability');
      cy.dataCy('reserve-about-property-title').should('have.text', 'About the property:');
      cy.dataCy('property-card').should('contain', propertiesNormalized[CREATION_PROPERTY].name);
    });
  });

  context('behavior tests', () => {
    it('calls handleCreateBooking on click button (create mode)', () => {
      mount();

      cy.dataCy('date-field-input').eq(0).type('2024-10-05');
      cy.dataCy('date-field-input').eq(1).type('2024-10-06');

      cy.dataCy('form-reserve-btn').click();

      cy.get('@handleCreateBookingSpy')
        .should('be.calledOnceWith', propertiesNormalized[CREATION_PROPERTY].id, '2024-10-05', '2024-10-06');
    });

    it('calls handleEditBooking on click button (edit mode)', () => {
      const editedBooking = bookings[EDITION_BOOKING_IDX];

      mount(true);

      // change only end date
      cy.dataCy('date-field-input').eq(1).type('2024-12-10');

      cy.dataCy('form-reserve-btn').click();

      cy.get('@handleEditBookingSpy')
        .should('be.calledOnceWith', editedBooking.idProperty, editedBooking.startDate, '2024-12-10', editedBooking.id);
    });
  });

});