import Button, { ButtonProps } from './Button';

const s = 'button-cmp';

describe('<Button />', () => {

  const mount = (props?: Partial<ButtonProps>) => {
    const onClickSpy = cy.spy().as('onClickSpy');

    return cy.mount(<Button
      title='my button'
      onClick={onClickSpy}
      {...props}
    />);
  };

  context('render tests', () => {
    it('renders', () => {
      mount();

      cy.dataCy(s)
        .should('have.text', 'my button');
    });

    it('renders disabled', () => {
      mount({ disabled: true });

      cy.dataCy(s)
        .should('have.attr', 'disabled', 'disabled')
        .and('have.class', 'disabled:bg-slate-200');
    });

    it('renders with custom className', () => {
      mount({ className: 'myClass' });

      cy.dataCy(s)
        .should('have.class', 'myClass');
    });

    it('renders with custom test id', () => {
      mount({ dataCy: 'myTestId' });

      cy.dataCy('myTestId').should('exist');
    });
  });

  context('behavior tests', () => {
    it('calls onChangeSpy', () => {
      mount();

      cy.dataCy(s).click();
      cy.get('@onClickSpy').should('be.calledOnce');
    });
  });

});