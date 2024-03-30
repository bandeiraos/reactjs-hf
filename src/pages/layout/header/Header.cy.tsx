import Header from './Header';

describe('<Header />', () => {
  it('renders', () => {
    cy.mountAll(<Header />);

    cy.dataCy('header')
      .get('a')
      .should('have.length', '3');

    cy.dataCy('header')
      .get('a').eq(0)
      .should('have.attr', 'href', '/')
      .and('have.text', 'Bkn');

    cy.dataCy('header')
      .get('a').eq(1)
      .should('have.attr', 'href', '/')
      .and('have.text', 'Properties');

    cy.dataCy('header')
      .get('a').eq(2)
      .should('have.attr', 'href', '/bookings')
      .and('have.text', 'My bookings');
  });
});