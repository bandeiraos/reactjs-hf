/// <reference types="cypress" />

Cypress.Commands.add('dataCy', (sel: string): void => {
    cy.get(`[data-cy="${sel}"]`);
});