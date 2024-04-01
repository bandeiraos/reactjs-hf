import Toaster from './Toaster';

describe('<Toaster />', () => {
  it('renders', () => {
    cy.mountAll(<Toaster />, {
      values: {
        toastQueue: [
          { id: 123, msg: 'Booking created!' }
        ]
      }
    });

    cy.dataCy('toaster')
      .dataCy('toast')
      .should('have.text', 'Booking created!');
  });
});