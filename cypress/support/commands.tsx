/// <reference types="cypress" />
import { BrowserRouter } from 'react-router-dom';
import { BookingProvider } from '../../src/context/context';

Cypress.Commands.add('mountAll', (component, providerOpts): Cypress.Chainable => {
    return cy.mount(
        <BookingProvider {...providerOpts}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </BookingProvider>
    );
});
