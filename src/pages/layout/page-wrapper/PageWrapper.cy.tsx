import PageWrapper from './PageWrapper';

describe('<PageWrapper />', () => {
  it('renders', () => {
    cy.mount(<PageWrapper />);

    cy.dataCy('page-wrapper').should('exist');
  });
});