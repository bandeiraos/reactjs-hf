import React from 'react';
import App from './App';

describe('<App />', () => {
  beforeEach(() => {
    cy.mount(<App />);
  });
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react

  });

  it('count on click', () => {
    cy.get('button').click();
    cy.get('button').should('have.text', 'count is 1');
  });
});