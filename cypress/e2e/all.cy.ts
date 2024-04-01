import { ERRORS } from "../../src/constants/constants";

describe('Bkn app e2e tests', () => {
    const visit = (route = '') => {
        cy.visit(`http://localhost:5173/${route}`);
    };

    context('hooks/helpers tests', () => {
        it('can restore scroll to top on changing pages', () => {
            visit();

            // just to force scroll appearence
            cy.viewport('iphone-6');

            // scroll window
            cy.scrollTo('bottom', { duration: 100 });

            cy.window().then($w => {
                expect($w.scrollY).to.not.equal(0);
            });

            // change page
            cy.dataCy('header').find('a').last().click();

            cy.window().then($w => {
                expect($w.scrollY).to.equal(0);
            });
        });
    });

    context('core flows', () => {
        beforeEach(() => visit());

        const createBooking = () => {
            cy.dataCy('property-card-availability-btn').eq(0).click();
            cy.dataCy('date-field-input').eq(0).type('2024-07-03');
            cy.dataCy('date-field-input').eq(1).type('2024-07-08');
            cy.dataCy('form-reserve-btn').click();
        };

        it('can create booking', () => {
            // properties list page
            cy.dataCy('page-title').should('have.text', 'Properties');
            // click 'see availability'
            cy.dataCy('property-card-availability-btn').eq(0).click();

            // reserve page
            cy.dataCy('page-title').should('have.text', 'Availability');
            // type fields
            cy.dataCy('date-field-input').eq(0).type('2024-07-03');
            cy.dataCy('date-field-input').eq(1).type('2024-07-08');
            // click reserve
            cy.dataCy('form-reserve-btn').click();
            cy.dataCy('toast').should('contain', 'successfully created');

            // my bookings page
            cy.dataCy('page-title').should('have.text', 'My Bookings');
            cy.dataCy('booking-card-start-date').should('have.text', '07/03/2024');
            cy.dataCy('booking-card-end-date').should('have.text', '07/08/2024');
        });

        it('can edit booking', () => {
            createBooking();

            // my bokings page - click edit btn
            cy.dataCy('booking-card-edit-btn').click();

            // reserve edit page - edit fields
            cy.dataCy('date-field-input').eq(0).type('2024-07-05');
            cy.dataCy('date-field-input').eq(1).type('2024-07-10');
            // click reserve btn (apply changes)
            cy.dataCy('form-reserve-btn').should('have.text', 'Apply changes').click();
            cy.dataCy('toast').should('contain', 'successfully updated');

            // my bookings page
            cy.dataCy('booking-card-start-date').should('have.text', '07/05/2024');
            cy.dataCy('booking-card-end-date').should('have.text', '07/10/2024');
        });

        it('can delete booking', () => {
            createBooking();

            //my booking page
            cy.dataCy('booking-card').should('have.length', 1);
            //click delete btn (open modal)
            cy.dataCy('booking-card-delete-btn').click();
            cy.dataCy('modal').should('exist');
            // click confirm delete
            cy.dataCy('modal-delete-btn').click();
            cy.dataCy('booking-card').should('have.length', 0);

            cy.dataCy('empty-state').should('exist');
        });
    });

    context('feedback validations', () => {
        it('can receive a feedback when accessing an inexistent page', () => {
            visit('i-dont-exist');
            cy.dataCy('not-found').should('exist');
        });
        it('can receive a feedback when accessing an inexistent property ID', () => {
            visit('reserve/wrongId');
            cy.dataCy('not-found').should('exist');
        });
        it('can receive a feedback when accessing an inexistent booking ID', () => {
            visit('booking/wrongId');
            cy.dataCy('not-found').should('exist');
        });
    });

    context('date input error validations', () => {
        it('can not create booking with same start and end dates', () => {
            visit();

            cy.dataCy('property-card-availability-btn').eq(0).click();

            cy.dataCy('date-field-input').eq(0).type('2024-05-05');
            cy.dataCy('date-field-input').eq(1).type('2024-05-05');

            cy.dataCy('form-errors')
                .should('contain', ERRORS.SAME_DATE);

            cy.dataCy('form-reserve-btn')
                .should('have.attr', 'disabled', 'disabled');
        });

        // all other date validations are located in Form.cy.tsx
        // this is just an e2e example
    });
});