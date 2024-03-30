import Layout from './Layout';

describe('<Layout />', () => {
  it('renders', () => {
    cy.mountAll(<Layout />);

    cy.dataCy('header').should('exist');
    cy.dataCy('toaster').should('exist');
    cy.dataCy('page-wrapper').should('exist');
  });
});