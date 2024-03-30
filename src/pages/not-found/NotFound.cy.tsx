import NotFound from './NotFound';

describe('<NotFound />', () => {
  it('renders', () => {
    cy.mount(<NotFound />);

    cy.dataCy('page-title').should('have.text', 'Something went wrong ):');

    cy.dataCy('not-found')
      .get('ul').get('li')
      .eq(0)
      .should('have.text', "The page doesn't exist");

    cy.dataCy('not-found')
      .get('ul').get('li')
      .eq(1)
      .should('have.text', "Wrong property ID");

    cy.dataCy('not-found')
      .get('ul').get('li')
      .eq(2)
      .should('have.text', "Wrong booking ID");
  });
});