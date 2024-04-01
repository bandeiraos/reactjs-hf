import Modal from './Modal';

describe('<Modal />', () => {

  const mount = () => {
    const onCancelSpy = cy.spy().as('onCancelSpy');

    return cy.mount(
      <Modal
        onCancel={onCancelSpy}
        Body={<p data-cy='mock-body'>mock body</p>}
        ButtonConfirm={<button data-cy='confirm-btn'>confirm</button>}
      />
    );
  };

  beforeEach(() => {
    mount();
  });

  context('render tests', () => {
    it('renders content', () => {
      cy.dataCy('mock-body').should('have.text', 'mock body');
      cy.dataCy('confirm-btn').should('have.text', 'confirm');
      cy.dataCy('modal-cancel-btn').should('have.text', 'Cancel');
    });

    it('renders with cancel button focused', () => {
      cy.dataCy('modal-cancel-btn').should('be.focused');
    });

    it('locks scroll bar', () => {
      cy.get('body')
        .should('have.css', 'overflow', 'hidden');
    });
  });

  context('behavior tests', () => {
    it('calls onCancel', () => {
      cy.dataCy('modal-cancel-btn').click();
      cy.get('@onCancelSpy').should('have.been.calledOnce');
    });
  });

});