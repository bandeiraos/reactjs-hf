import PropertyList from './PropertyList';
import { PropertyType } from '../../types/types';

describe('<PropertyList />', () => {
  let properties: PropertyType[];

  const mount = (withData?: boolean) => {
    cy.mountAll(<PropertyList />, {
      values: {
        properties: withData ? properties : []
      }
    });
  };

  before(() => {
    cy.fixture('properties').then(data => {
      properties = data;
    });
  });


  it('renders with title', () => {
    mount(true);

    cy.dataCy('page-title')
      .should('have.text', 'Properties');
  });

  it('renders with empty data', () => {
    mount();

    cy.dataCy('property-card')
      .should('not.exist');

    cy.dataCy('empty-state')
      .should('exist');
  });

  it('renders with data', () => {
    mount(true);

    cy.dataCy('property-card')
      .should('have.length', 3);

    cy.dataCy('property-card-availability-btn')
      .should('have.length', 3);

    cy.dataCy('property-card-title')
      .eq(0)
      .should('have.text', properties[0].name);

    cy.dataCy('property-card-title')
      .eq(1)
      .should('have.text', properties[1].name);

    cy.dataCy('property-card-title')
      .eq(2)
      .should('have.text', properties[2].name);
  });

});