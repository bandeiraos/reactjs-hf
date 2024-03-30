import EmptyState from './EmptyState';

describe('<EmptyState />', () => {
  it('renders', () => {
    cy.mount(<EmptyState />);
    cy.dataCy('empty-state').should('contain', 'Nothing to see here');
  });
});