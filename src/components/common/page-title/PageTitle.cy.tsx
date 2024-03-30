import PageTitle from './PageTitle';

describe('<PageTitle />', () => {
  it('renders', () => {
    cy.mount(<PageTitle title='My Page Title' />);
    cy.dataCy('page-title').should('have.text', 'My Page Title');
  });
});