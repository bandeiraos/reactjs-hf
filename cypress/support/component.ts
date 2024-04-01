import { BookingProviderProps } from '../../src/context/context';

import './commands.ts';
import './commands.tsx';

import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount,
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