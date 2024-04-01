import PropertyCard, { PropertyCardProps } from './PropertyCard';
import propertyImg from '../../../public/images/properties/p1.webp';

describe('<PropertyCard />', () => {
  let property: PropertyCardProps;

  const mount = (showButton?: boolean) => {
    const props = { ...property, img: propertyImg };

    cy.mountAll(
      <PropertyCard
        {...props}
        showButton={showButton}
      />
    );
  };

  before(() => {
    cy.fixture('property').then(data => {
      property = data;
    });
  });

  it('renders default (without availability button)', () => {
    mount();

    cy.dataCy('property-card-img')
      .should('have.attr', 'src', propertyImg);

    cy.dataCy('property-card-title')
      .should('have.text', property.name);

    cy.dataCy('property-card-location')
      .should('contain', property.location);

    cy.dataCy('property-card-description')
      .should('have.text', property.description);

    cy.dataCy('property-card-rating')
      .should('contain', property.rating);

    cy.dataCy('property-card-price')
      .should('contain', property.price);

    cy.dataCy('property-card-show-btn')
      .should('not.exist');

  });

  it('renders with availability button', () => {
    mount(true);

    cy.dataCy('property-card-availability-btn')
      .should('exist')
      .and('have.text', 'See availability')
      .and('have.attr', 'href', `/reserve/${property.id}`);
  });
});