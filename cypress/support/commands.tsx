/// <reference types="cypress" />
import { BrowserRouter } from 'react-router-dom';
import { BookingProvider, BookingProviderProps } from '../../src/context/context';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Cypress {
        interface Chainable<Subject> {
            /**
             * Custom command to select DOM element by data-cy attribute.
             * @example cy.dataCy('title')
            */
            dataCy(sel: string): Cypress.Chainable<Element>;

            /**
             * Custom command to mount with context provider and react-router stuff
             * @example cy.mountAll(<Cmp />)
            */
            mountAll(
                component: React.ReactElement,
                providerOpts?: Omit<BookingProviderProps, 'children'>,
            ): Cypress.Chainable<Element>;
        }
    }
}

Cypress.Commands.add('dataCy', (sel: string): void => {
    cy.get(`[data-cy="${sel}"]`);
});

Cypress.Commands.add('mountAll', (component, providerOpts): Cypress.Chainable => {
    return cy.mount(
        <BookingProvider {...providerOpts}>
            <BrowserRouter>
                {component}
            </BrowserRouter>
        </BookingProvider>
    );
});

export { };